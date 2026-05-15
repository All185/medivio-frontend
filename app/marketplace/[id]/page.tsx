'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface Specialist {
  id: string;
  full_name: string;
  specialty: string;
  sub_specialty: string;
  bio: string;
  languages: string[];
  consultation_price: number;
  years_experience: number;
  city: string;
  country: string;
  average_rating: number;
  total_reviews: number;
  is_verified: boolean;
  is_claimed: boolean;
  clinic_name: string;
  reviews: Review[];
}

export default function SpecialistProfilePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { id } = useParams();
  const [specialist, setSpecialist] = useState<Specialist | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [reviewed, setReviewed] = useState(false);

  useEffect(() => { fetchSpecialist(); }, [id]);

  async function fetchSpecialist() {
    try {
      const res = await fetch(`/api/marketplace/specialists/${id}`);
      if (res.ok) setSpecialist(await res.json());
    } finally {
      setLoading(false);
    }
  }

  async function handleReview() {
    if (!comment.trim()) return;
    setSubmitting(true);
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`/api/marketplace/specialists/${id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ rating, comment }),
      });
      if (res.ok) {
        setReviewed(true);
        fetchSpecialist();
      }
    } finally {
      setSubmitting(false);
    }
  }

  function renderStars(r: number) {
    return '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));
  }

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-400">{t('marketplace.loading')}</p></div>;
  if (!specialist) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">{t('marketplace.not_found')}</p></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Medivio" width={36} height={36} />
          <span className="font-bold text-gray-900 text-lg hidden sm:block">Medivio</span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="/marketplace" className="text-sm text-gray-500 hover:text-gray-700">{t('marketplace.back_list')}</Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        {/* Profil principal */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl font-bold text-blue-600 flex-shrink-0">
              {specialist.full_name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">Dr. {specialist.full_name}</h1>
                {specialist.is_verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✓ {t('marketplace.verified')}</span>}
              </div>
              <p className="text-blue-600 font-medium mb-1">{specialist.specialty}</p>
              {specialist.sub_specialty && <p className="text-sm text-gray-500 mb-2">{specialist.sub_specialty}</p>}
              {specialist.total_reviews > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-yellow-500">{renderStars(specialist.average_rating)}</span>
                  <span className="text-sm text-gray-500">{specialist.average_rating}/5 ({specialist.total_reviews} {t('marketplace.reviews')})</span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                {specialist.city && <span>📍 {specialist.city}, {specialist.country}</span>}
                {specialist.years_experience && <span>🎓 {specialist.years_experience} {t('marketplace.years_exp')}</span>}
                {specialist.consultation_price && <span>💶 {specialist.consultation_price}€ / {t('marketplace.consultation')}</span>}
                {specialist.clinic_name && <span>🏥 {specialist.clinic_name}</span>}
                {specialist.languages && <span>🌐 {specialist.languages.join(', ')}</span>}
              </div>
            </div>
          </div>

          {specialist.bio && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h2 className="font-semibold text-gray-900 mb-2">{t('marketplace.about')}</h2>
              <p className="text-sm text-gray-600">{specialist.bio}</p>
            </div>
          )}

          <button onClick={() => router.push('/appointments/new')} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
            {t('marketplace.book_appointment')}
          </button>
        </div>

        {/* Avis */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">{t('marketplace.patient_reviews')}</h2>

          {specialist.reviews.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">{t('marketplace.no_reviews')}</p>
          ) : (
            <div className="space-y-4 mb-6">
              {specialist.reviews.map(review => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-500 text-sm">{renderStars(review.rating)}</span>
                    <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                  {review.comment && <p className="text-sm text-gray-600">{review.comment}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Formulaire avis */}
          {!reviewed ? (
            <div className="border-t border-gray-100 pt-4">
              <h3 className="font-medium text-gray-900 mb-3">{t('marketplace.leave_review')}</h3>
              <div className="flex gap-2 mb-3">
                {[1,2,3,4,5].map(star => (
                  <button key={star} onClick={() => setRating(star)} className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</button>
                ))}
              </div>
              <textarea className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[80px] mb-3" placeholder={t('marketplace.review_placeholder')} value={comment} onChange={e => setComment(e.target.value)} />
              <button onClick={handleReview} disabled={submitting || !comment.trim()} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 rounded-xl text-sm transition-colors">
                {submitting ? t('marketplace.submitting') : t('marketplace.submit_review')}
              </button>
            </div>
          ) : (
            <div className="border-t border-gray-100 pt-4 text-center">
              <p className="text-green-600 font-medium">✅ {t('marketplace.review_submitted')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
