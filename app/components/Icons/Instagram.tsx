export type Props = {
  color: string;
  height: string;
  link: string;
};

export default function Instagram(props: Props) {
  return (
    <svg
      style={{
        width: 'auto', // Makes the SVG responsive
        height: props.height, // Maintains aspect ratio
        maxWidth: '19px', // Optional: set a max size
      }}
      viewBox="0 0 25 25"
      fill={`${props.color}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.50706 24.9859H17.4859L17.4929 24.9929C21.6314 24.9929 25 21.6243 25 17.4859V7.50706C25 3.36864 21.6314 0 17.4929 0H7.51412C3.37571 0 0.00706215 3.36864 0 7.5V17.4788C0 21.6172 3.36864 24.9859 7.50706 24.9859ZM2.35876 7.50706C2.35876 4.66102 4.67514 2.35169 7.51412 2.35169H17.4929C20.339 2.35169 22.6483 4.66808 22.6483 7.50706V17.4859C22.6483 20.3319 20.3319 22.6412 17.4929 22.6412H7.51412C4.66808 22.6412 2.35876 20.3249 2.35876 17.4859V7.50706ZM19.1175 4.46289C18.3054 4.46289 17.6556 5.11967 17.6556 5.92476C17.6556 6.72984 18.3124 7.38662 19.1175 7.38662C19.9226 7.38662 20.5794 6.72984 20.5794 5.92476C20.5794 5.11967 19.9226 4.46289 19.1175 4.46289ZM12.6056 6.34277C9.21577 6.34277 6.45447 9.10407 6.45447 12.4939C6.45447 15.8837 9.21577 18.645 12.6056 18.645C15.9954 18.645 18.7567 15.8837 18.7567 12.4939C18.7567 9.10407 15.9954 6.34277 12.6056 6.34277ZM12.6056 16.4346C10.4305 16.4346 8.66492 14.669 8.66492 12.4939C8.66492 10.3188 10.4305 8.55323 12.6056 8.55323C14.7807 8.55323 16.5463 10.3188 16.5463 12.4939C16.5463 14.669 14.7807 16.4346 12.6056 16.4346Z" />
    </svg>
  );
}
