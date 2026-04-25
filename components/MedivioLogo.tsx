export default function MedivioLogo({ size = 64 }: { size?: number }) {
    return (
      <div style={{
        width: size,
        height: size,
        overflow: 'hidden',
        borderRadius: '16px',
      }}>
        <img
          src="/logo.png"
          alt="Medivio Logo"
          style={{
            width: size,
            height: 'auto',
            marginTop: '-8px',
            display: 'block',
          }}
        />
      </div>
    )
  }