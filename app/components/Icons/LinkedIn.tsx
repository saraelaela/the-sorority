import Link from 'next/link';

export type Props = {
  color: string;
  link: string; // Accepts full URLs or relative paths
  height: string;
};

export default function LinkedIn(props: Props) {
  return (
    <a href={props.link} target="_blank" rel="noopener noreferrer">
      <svg
        style={{
          width: 'auto',
          height: props.height,
          maxWidth: '20px',
        }}
        viewBox="0 0 26 25"
        fill={props.color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_543_1307)">
          <path d="M6.13015 2.78187C6.13015 4.31083 5.15718 5.56179 3.35023 5.56179C1.68228 5.56179 0.570312 4.31083 0.570312 2.92087C0.577628 1.39191 1.6896 0.00195312 3.35755 0.00195312C5.0255 0.00195312 6.13746 1.25292 6.13746 2.78187H6.13015Z" />
          <path d="M6.12967 6.94531H0.577148V24.9928H6.12967V6.94531Z" />
          <path d="M19.4586 7.22216C16.5396 7.22216 14.879 8.89011 14.184 10.0021H14.045L13.767 7.63915H8.77051C8.77051 9.1681 8.9095 10.9677 8.9095 13.0527V24.9917H14.462V15.1376C14.462 14.5816 14.462 14.1646 14.601 13.7477C15.018 12.7747 15.713 11.5237 17.2419 11.5237C19.1879 11.5237 20.0219 13.1917 20.0219 15.4083V24.9844H25.5744V14.7133C25.5744 9.57777 22.9335 7.21484 19.4659 7.21484L19.4586 7.22216Z" />
        </g>
        <defs>
          <clipPath id="clip0_543_1307">
            <rect
              width="24.99"
              height="24.99"
              fill="white"
              transform="translate(0.577148 0.00195312)"
            />
          </clipPath>
        </defs>
      </svg>
    </a>
  );
}
