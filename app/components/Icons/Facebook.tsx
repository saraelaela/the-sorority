export default function Facebook(props: Props) {
  return (
    <svg
      style={{
        width: 'auto', // Makes the SVG responsive
        height: props.height, // Maintains aspect ratio
        maxWidth: '14px', // Optional: set a max size
      }}
      fill={`${props.color}`}
      viewBox="0 0 14 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.5091 14.0579L13.2013 9.53743H8.86446V6.59909C8.86446 5.36301 9.4719 4.15518 11.4143 4.15518H13.385V0.305676C13.385 0.305676 11.5909 0.00195312 9.88157 0.00195312C6.30754 0.00195312 3.96958 2.17039 3.96958 6.09053V9.53743H0V14.0579H3.96958V24.992H8.85739V14.0579H12.5021H12.5091Z" />
    </svg>
  );
}
