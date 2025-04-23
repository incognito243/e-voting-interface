interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export function AprIcon(props: IconProps) {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="sparkles"
      className="svg-inline--fa fa-sparkles sparkles"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill={props.color || "#FFFFFF"}
        d="M327.5 85.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 128l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 128l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 64 426.8 7.5C425.1 3 420.8 0 416 0s-9.1 3-10.8 7.5L384 64 327.5 85.2zM205.1 73.3c-2.6-5.7-8.3-9.3-14.5-9.3s-11.9 3.6-14.5 9.3L123.3 187.3 9.3 240C3.6 242.6 0 248.3 0 254.6s3.6 11.9 9.3 14.5l114.1 52.7L176 435.8c2.6 5.7 8.3 9.3 14.5 9.3s11.9-3.6 14.5-9.3l52.7-114.1 114.1-52.7c5.7-2.6 9.3-8.3 9.3-14.5s-3.6-11.9-9.3-14.5L257.8 187.4 205.1 73.3zM384 384l-56.5 21.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 448l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 448l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 384l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L384 384z"
      />
    </svg>
  );
}

export function ArrowBackIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <g clipPath="url(#clip0_29_187)">
        <path
          d="M19 11H7.83L12.71 6.12C13.1 5.73 13.1 5.09 12.71 4.7C12.32 4.31 11.69 4.31 11.3 4.7L4.71 11.29C4.32 11.68 4.32 12.31 4.71 12.7L11.3 19.29C11.69 19.68 12.32 19.68 12.71 19.29C13.1 18.9 13.1 18.27 12.71 17.88L7.83 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z"
          fill={props.color || "#FFFFFF"}
        />
      </g>
      <defs>
        <clipPath id="clip0_29_187">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function ArrowForwardIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <g clipPath="url(#clip0_29_188)">
        <path
          d="M5 13H16.17L11.29 17.88C10.9 18.27 10.9 18.91 11.29 19.3C11.68 19.69 12.31 19.69 12.7 19.3L19.29 12.71C19.68 12.32 19.68 11.69 19.29 11.3L12.71 4.7C12.32 4.31 11.69 4.31 11.3 4.7C10.91 5.09 10.91 5.72 11.3 6.11L16.17 11H5C4.45 11 4 11.45 4 12C4 12.55 4.45 13 5 13Z"
          fill={props.color || "#FFFFFF"}
        />
      </g>
      <defs>
        <clipPath id="clip0_29_188">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function CaretDownIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <path d="M8.70999 11.71L11.3 14.3C11.69 14.69 12.32 14.69 12.71 14.3L15.3 11.71C15.93 11.08 15.48 10 14.59 10H9.40999C8.51999 10 8.07999 11.08 8.70999 11.71Z" fill={props.color || "#FFFFFF"} />
    </svg>
  );
}

export function CaretLeftIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <path
        d="M12.59 15.59L10 13C9.61002 12.61 9.61002 11.98 10 11.59L12.59 9.00002C13.22 8.37002 14.3 8.82002 14.3 9.71002V14.89C14.3 15.78 13.22 16.22 12.59 15.59Z"
        fill={props.color || "#FFFFFF"}
      />
    </svg>
  );
}

export function CaretRightIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <path
        d="M11.4175 9.00253L14.0075 11.5925C14.3975 11.9825 14.3975 12.6125 14.0075 13.0025L11.4175 15.5925C10.7875 16.2225 9.70752 15.7725 9.70752 14.8825L9.70752 9.70253C9.70752 8.81253 10.7875 8.37253 11.4175 9.00253Z"
        fill={props.color || "#FFFFFF"}
      />
    </svg>
  );
}

export function CaretUpIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <path
        d="M8.70999 12.8823L11.3 10.2923C11.69 9.90229 12.32 9.90229 12.71 10.2923L15.3 12.8823C15.93 13.5123 15.48 14.5923 14.59 14.5923H9.40999C8.51999 14.5923 8.07999 13.5123 8.70999 12.8823Z"
        fill={props.color || "#FFFFFF"}
      />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <g clipPath="url(#clip0_23_141)">
        <path
          d="M15.88 9.29L12 13.17L8.12001 9.29C7.73001 8.9 7.10001 8.9 6.71001 9.29C6.32001 9.68 6.32001 10.31 6.71001 10.7L11.3 15.29C11.69 15.68 12.32 15.68 12.71 15.29L17.3 10.7C17.69 10.31 17.69 9.68 17.3 9.29C16.91 8.91 16.27 8.9 15.88 9.29Z"
          fill={props.color || "#FFFFFF"}
        />
      </g>
      <defs>
        <clipPath id="clip0_23_141">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <g clipPath="url(#clip0_23_147)">
        <path
          d="M15.005 8.41514L11.125 12.2951L15.005 16.1751C15.395 16.5651 15.395 17.1951 15.005 17.5851C14.615 17.9751 13.985 17.9751 13.595 17.5851L9.00498 12.9951C8.61498 12.6051 8.61498 11.9751 9.00498 11.5851L13.595 6.99514C13.985 6.60514 14.615 6.60514 15.005 6.99514C15.385 7.38514 15.395 8.02514 15.005 8.41514Z"
          fill={props.color || "#FFFFFF"}
        />
      </g>
      <defs>
        <clipPath id="clip0_23_147">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <g clipPath="url(#clip0_23_150)">
        <path
          d="M9.00501 8.41514L12.885 12.2951L9.00501 16.1751C8.61501 16.5651 8.61501 17.1951 9.00501 17.5851C9.39501 17.9751 10.025 17.9751 10.415 17.5851L15.005 12.9951C15.395 12.6051 15.395 11.9751 15.005 11.5851L10.415 6.99514C10.025 6.60514 9.39501 6.60514 9.00501 6.99514C8.62501 7.38514 8.61501 8.02514 9.00501 8.41514Z"
          fill={props.color || "#FFFFFF"}
        />
      </g>
      <defs>
        <clipPath id="clip0_23_150">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function ChevronUpIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <g clipPath="url(#clip0_23_144)">
        <path
          d="M15.88 15.29L12 11.41L8.12001 15.29C7.73001 15.68 7.10001 15.68 6.71001 15.29C6.32001 14.9 6.32001 14.27 6.71001 13.88L11.3 9.28996C11.69 8.89996 12.32 8.89996 12.71 9.28996L17.3 13.88C17.69 14.27 17.69 14.9 17.3 15.29C16.91 15.67 16.27 15.68 15.88 15.29Z"
          fill={props.color || "#FFFFFF"}
        />
      </g>
      <defs>
        <clipPath id="clip0_23_144">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <g clipPath="url(#clip0_40_3870)">
        <path
          d="M15 20H5V7C5 6.45 4.55 6 4 6C3.45 6 3 6.45 3 7V20C3 21.1 3.9 22 5 22H15C15.55 22 16 21.55 16 21C16 20.45 15.55 20 15 20ZM20 16V4C20 2.9 19.1 2 18 2H9C7.9 2 7 2.9 7 4V16C7 17.1 7.9 18 9 18H18C19.1 18 20 17.1 20 16ZM18 16H9V4H18V16Z"
          fill={props.color || "#FFFFFF"}
        />
      </g>
      <defs>
        <clipPath id="clip0_40_3870">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function DeleteIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <g clipPath="url(#clip0_44_1167)">
        <path
          d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V9C18 7.9 17.1 7 16 7H8C6.9 7 6 7.9 6 9V19ZM18 4H15.5L14.79 3.29C14.61 3.11 14.35 3 14.09 3H9.91C9.65 3 9.39 3.11 9.21 3.29L8.5 4H6C5.45 4 5 4.45 5 5C5 5.55 5.45 6 6 6H18C18.55 6 19 5.55 19 5C19 4.45 18.55 4 18 4Z"
          fill={props.color || "#FFFFFF"}
        />
      </g>
      <defs>
        <clipPath id="clip0_44_1167">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function EditIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <path
        d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
        fill={props.color || "#FFFFFF"}
      />
    </svg>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <path d="M19 19H5V5H12V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V12H19V19ZM14 3V5H17.59L7.76 14.83L9.17 16.24L19 6.41V10H21V3H14Z" fill={props.color || "#FFFFFF"} />
    </svg>
  );
}

export function FailedIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <rect width="88" height="88" rx="44" fill="#FF6565" fillOpacity="0.2" />
      <g clipPath="url(#clip0_2919_23474)">
        <path
          d="M59.4007 28.6252C58.4474 27.6719 56.9074 27.6719 55.9541 28.6252L44.0007 40.5541L32.0474 28.6007C31.0941 27.6474 29.5541 27.6474 28.6007 28.6007C27.6474 29.5541 27.6474 31.0941 28.6007 32.0474L40.5541 44.0007L28.6007 55.9541C27.6474 56.9074 27.6474 58.4474 28.6007 59.4007C29.5541 60.3541 31.0941 60.3541 32.0474 59.4007L44.0007 47.4474L55.9541 59.4007C56.9074 60.3541 58.4474 60.3541 59.4007 59.4007C60.3541 58.4474 60.3541 56.9074 59.4007 55.9541L47.4474 44.0007L59.4007 32.0474C60.3296 31.1185 60.3296 29.5541 59.4007 28.6252Z"
          fill="#FF6565"
        />
      </g>
      <defs>
        <clipPath id="clip0_2919_23474">
          <rect width="58.6667" height="58.6667" fill="white" transform="translate(14.667 14.667)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.54597 4.67516C5.2293 6.8335 8.33763 10.8335 8.33763 10.8335V15.8335C8.33763 16.2918 8.71263 16.6668 9.17097 16.6668H10.8376C11.296 16.6668 11.671 16.2918 11.671 15.8335V10.8335C11.671 10.8335 14.771 6.8335 16.4543 4.67516C16.8793 4.12516 16.4876 3.3335 15.796 3.3335H4.2043C3.51263 3.3335 3.12097 4.12516 3.54597 4.67516Z"
        fill={props.color || "#FFFFFF"}
      />
    </svg>
  );
}

export function FrequencyIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} fill={props.color || "#FFFFFF"} viewBox="0 0 24 24" id="frequency" data-name="Line Color" xmlns="http://www.w3.org/2000/svg">
      <polyline
        id="primary"
        points="3 12 7 12 9 16 13 8 16 15 18 12 21 12"
        style={{
          fill: "none",
          stroke: props.color || "#FFFFFF",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
        }}
      ></polyline>
    </svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z"
        fill={props.color || "#FFFFFF"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12C11 11.4477 11.4477 11 12 11Z"
        fill={props.color || "#FFFFFF"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 8C11 7.44772 11.4477 7 12 7H12.01C12.5623 7 13.01 7.44772 13.01 8C13.01 8.55228 12.5623 9 12.01 9H12C11.4477 9 11 8.55228 11 8Z"
        fill={props.color || "#FFFFFF"}
      />
    </svg>
  );
}

export function LogoIcon(props: IconProps) {
  return (
    <svg width={props.size || "48"} height={props.size || "48"} viewBox="0 0 62 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <path
        d="M16.2289 8.15821C16.2289 9.64931 16.223 11.1424 16.2347 12.6335C16.2386 13.0208 16.2464 13.4199 16.3457 13.7897C16.7428 15.2886 18.6037 16.1646 19.8943 14.7689C22.0064 12.4836 24.2314 10.3034 26.4135 8.08424C28.7553 5.7016 31.1107 3.33452 33.4388 0.942141C34.1805 0.179071 34.9922 -0.23945 36.0453 0.171284C37.1004 0.582018 37.4294 1.43269 37.4216 2.50527C37.4041 5.29475 37.4021 8.08424 37.4255 10.8718C37.4391 12.4894 38.502 13.5523 39.8977 13.2486C40.4817 13.1221 41.0617 12.688 41.5036 12.2539C45.2956 8.52612 49.0526 4.76333 52.8309 1.02195C53.1696 0.687135 53.5551 0.340639 53.9853 0.163498C55.379 -0.412698 56.8293 0.615111 56.8487 2.21717C56.8877 5.36289 56.8546 8.5086 56.8799 11.6543C56.8838 12.1604 56.9383 12.7133 57.1505 13.161C57.8376 14.6112 59.5662 14.7923 60.7906 13.6204C61.0106 13.4082 61.3571 13.3284 61.6452 13.1863C61.5284 13.5036 61.4953 13.9027 61.2792 14.1246C57.3354 18.1579 53.3643 22.166 49.4107 26.1916C48.6671 26.9488 47.8515 27.3537 46.7964 26.9332C45.7297 26.5069 45.4533 25.6329 45.4572 24.5778C45.4689 21.5295 45.4864 18.4811 45.4319 15.4327C45.4202 14.7884 45.2703 14.035 44.9102 13.5289C44.1082 12.4038 42.6463 12.4699 41.5328 13.5756C39.0937 15.9972 36.6682 18.4324 34.2369 20.8618C32.7926 22.3062 31.3365 23.7408 29.9038 25.1969C29.1504 25.9638 28.3056 26.3025 27.27 25.8684C26.2675 25.446 25.9522 24.607 25.9541 23.5851C25.96 20.7644 25.9677 17.9419 25.9463 15.1212C25.9366 13.7489 25.2047 12.8846 24.0036 12.7425C23.0926 12.6335 22.4872 13.161 21.9032 13.7547C17.5156 18.2183 13.1377 22.6877 8.71107 27.1123C8.24972 27.5737 7.51391 27.9435 6.87542 28C5.66073 28.1051 4.82369 27.0968 4.80033 25.701C4.74778 22.4911 4.69522 19.2811 4.703 16.0692C4.70495 15.0064 4.36429 14.2277 3.37931 13.8112C2.39238 13.3926 1.56313 13.6593 0.844828 14.4497C0.656007 14.6579 0.286151 14.7047 0 14.8253C0.10901 14.5334 0.138209 14.1635 0.33871 13.9611C4.35261 9.85371 8.38793 5.77362 12.4194 1.68964C13.126 0.973287 13.9552 0.724121 14.9013 1.11928C15.8084 1.49692 16.2211 2.23274 16.225 3.19631C16.2328 4.85093 16.2269 6.5036 16.2289 8.15821Z"
        fill="white"
      />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <g clipPath="url(#clip0_26_1332)">
        <path
          d="M4 18H20C20.55 18 21 17.55 21 17C21 16.45 20.55 16 20 16H4C3.45 16 3 16.45 3 17C3 17.55 3.45 18 4 18ZM4 13H20C20.55 13 21 12.55 21 12C21 11.45 20.55 11 20 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13ZM3 7C3 7.55 3.45 8 4 8H20C20.55 8 21 7.55 21 7C21 6.45 20.55 6 20 6H4C3.45 6 3 6.45 3 7Z"
          fill={props.color || "#FFFFFF"}
        />
      </g>
      <defs>
        <clipPath id="clip0_26_1332">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <g clipPath="url(#clip0_46_8551)">
        <path d="M18 13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z" fill={props.color || "#FFFFFF"} />
      </g>
      <defs>
        <clipPath id="clip0_46_8551">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <g clipPath="url(#clip0_43_32)">
        <path
          d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"
          fill={props.color || "#FFFFFF"}
        />
      </g>
      <defs>
        <clipPath id="clip0_43_32">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <path
        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        fill={props.color || "#FFFFFF"}
      />
    </svg>
  );
}

export function SuccessIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <rect width="88" height="88" rx="44" fill="#31CB9E" fillOpacity="0.2" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M65.284 27.6056C66.2387 28.5602 66.2387 30.108 65.284 31.0626L38.3952 57.9515C37.4405 58.9061 35.8928 58.9061 34.9382 57.9515L22.716 45.7292C21.7613 44.7746 21.7613 43.2269 22.716 42.2723C23.6706 41.3177 25.2183 41.3177 26.1729 42.2723L36.6667 52.766L61.8271 27.6056C62.7817 26.651 64.3294 26.651 65.284 27.6056Z"
        fill="#31CB9E"
      />
    </svg>
  );
}

export function SwapIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor">
      <path
        d="M6.14 11.86L3.36 14.65C3.17 14.85 3.17 15.16 3.36 15.36L6.14 18.15C6.45 18.47 6.99 18.24 6.99 17.8V16H13C13.55 16 14 15.55 14 15C14 14.45 13.55 14 13 14H6.99V12.21C6.99 11.76 6.45 11.54 6.14 11.86ZM20.65 8.65L17.87 5.86C17.56 5.54 17.02 5.77 17.02 6.21V8H11C10.45 8 10 8.45 10 9C10 9.55 10.45 10 11 10H17.01V11.79C17.01 12.24 17.55 12.46 17.86 12.14L20.64 9.35C20.84 9.16 20.84 8.84 20.65 8.65Z"
        fill={props.color || "#FFFFFF"}
      />
    </svg>
  );
}

export function RebalanceIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.06189 13C4.02104 12.6724 4 12.3387 4 12C4 7.58172 7.58172 4 12 4C14.5006 4 16.7332 5.14727 18.2002 6.94416M19.9381 11C19.979 11.3276 20 11.6613 20 12C20 16.4183 16.4183 20 12 20C9.61061 20 7.46589 18.9525 6 17.2916M9 17H6V17.2916M18.2002 4V6.94416M18.2002 6.94416V6.99993L15.2002 7M6 20V17.2916"
        stroke={props.color || "#FFFFFF"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TUSDIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_174_8109)">
        <path d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05888 27.9411 0 18 0C8.05888 0 0 8.05888 0 18C0 27.9411 8.05888 36 18 36Z" fill="#6FA9E4" />
        <path d="M24.0355 7.9505V11.9735H20.0119V28.0679H15.9885V11.9735H11.9648V7.9505H24.0355Z" fill="#181A1B" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.9487 7.93463H24.0512V11.9894H20.0275V28.0838H15.9724V11.9894H11.9487V7.93463ZM11.9805 7.96638V11.9577H16.0042V28.052H19.9958V11.9577H24.0194V7.96638H11.9805Z"
          fill="#2D3E4D"
        />
        <path
          d="M17.8106 34.91V34.1998C17.4553 34.155 17.1667 34.0756 16.9445 33.961C16.7222 33.8467 16.5301 33.6619 16.3682 33.4067C16.2063 33.1514 16.1123 32.8399 16.0859 32.4713L16.8 32.3373C16.8552 32.7187 16.9524 32.999 17.0921 33.1778C17.2921 33.4302 17.5315 33.5711 17.8103 33.6V31.3391C17.5182 31.2839 17.2197 31.1708 16.9146 30.9997C16.6882 30.8733 16.5142 30.6984 16.3917 30.4749C16.2695 30.2514 16.2082 29.9974 16.2082 29.7132C16.2082 29.2081 16.3869 28.7991 16.7447 28.4861C16.9841 28.2756 17.3391 28.1467 17.8103 28.0994V27.7599H18.2284V28.0994C18.6415 28.1387 18.9688 28.26 19.2111 28.4623C19.5213 28.7201 19.7083 29.0738 19.7715 29.5237L19.0374 29.6341C18.9952 29.3554 18.9079 29.1417 18.7748 28.9928C18.6421 28.8442 18.4599 28.7461 18.2284 28.6988V30.7467C18.5862 30.8362 18.8228 30.9057 18.9387 30.9559C19.1596 31.0534 19.3397 31.1715 19.4794 31.3109C19.6188 31.4502 19.7261 31.616 19.801 31.8081C19.8759 32.0002 19.9134 32.2081 19.9134 32.4316C19.9134 32.9234 19.7569 33.334 19.4438 33.6629C19.1308 33.9918 18.7256 34.168 18.2284 34.1915V34.9097H17.8103L17.8106 34.91ZM17.8106 28.6915C17.5344 28.7337 17.3166 28.8442 17.1575 29.023C16.9984 29.202 16.9187 29.4135 16.9187 29.6583C16.9187 29.9031 16.9864 30.1028 17.1219 30.266C17.2575 30.4292 17.4871 30.5593 17.8106 30.6565V28.6915ZM18.2291 33.6C18.5053 33.5657 18.7336 33.446 18.9136 33.2409C19.0939 33.0358 19.1838 32.7818 19.1838 32.4793C19.1838 32.2214 19.12 32.0144 18.9923 31.8579C18.8647 31.7014 18.6101 31.5614 18.2287 31.4375V33.6H18.2291Z"
          fill="#E8E6E3"
        />
        <path
          d="M30.4965 22.6853C28.2229 24.1928 26.2541 24.8364 23.9122 24.8364C21.9694 24.8364 20.1292 24.2569 18.0001 22.966C17.8546 22.8784 17.7064 22.7863 17.5559 22.6904C15.5194 21.3906 13.8329 20.8108 12.0879 20.8108C10.0588 20.8108 8.40871 21.3566 6.39132 22.6945L5.50391 21.356C7.77752 19.8485 9.74634 19.2049 12.0882 19.2049C14.031 19.2049 15.8712 19.7843 18.0004 21.0753C18.1458 21.1629 18.2941 21.255 18.4446 21.3509C20.481 22.6507 22.1676 23.2305 23.9125 23.2305C25.9417 23.2305 27.5917 22.6847 29.6091 21.3467L30.4965 22.6853Z"
          fill="#E8E6E3"
        />
        <path
          d="M30.4965 26.6881C28.2229 28.1956 26.2541 28.8391 23.9122 28.8391C21.9694 28.8391 20.1292 28.2597 18.0001 26.9687C17.8546 26.8811 17.7064 26.789 17.5559 26.6932C15.5194 25.3933 13.8329 24.8136 12.0879 24.8136C10.0588 24.8136 8.40871 25.3593 6.39132 26.6973L5.50391 25.3587C7.77752 23.8512 9.74634 23.2076 12.0882 23.2076C14.031 23.2076 15.8712 23.7871 18.0004 25.078C18.1458 25.1657 18.2941 25.2577 18.4446 25.3536C20.481 26.6535 22.1676 27.2332 23.9125 27.2332C25.9417 27.2332 27.5917 26.6874 29.6091 25.3495L30.4965 26.6881Z"
          fill="#E8E6E3"
        />
      </g>
      <defs>
        <clipPath id="clip0_174_8109">
          <rect width="36" height="36" rx="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function WalletIcon(props: IconProps) {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <g clipPath="url(#clip0_57_1063)">
        <path
          d="M10 16V8C10 6.9 10.89 6 12 6H21V5C21 3.9 20.1 3 19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V18H12C10.89 18 10 17.1 10 16ZM13 8C12.45 8 12 8.45 12 9V15C12 15.55 12.45 16 13 16H22V8H13ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"
          fill={props.color || "#FFFFFF"}
        />
      </g>
      <defs>
        <clipPath id="clip0_57_1063">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function VotingIcon(props: IconProps) {
  return (
    <svg width={props.size || 64} height={props.size || 64} viewBox="0 0 196.338 196.338" fill="#fff"
         xmlns="http://www.w3.org/2000/svg" className={props.className} onClick={props.onClick}>
      <g>
        <path d="M195.767,66.465c-0.761-1.838-2.221-3.298-4.059-4.059L63.483,9.295c-3.824-1.583-8.214,0.232-9.799,4.059L0.571,141.58
		c-0.762,1.838-0.762,3.902,0,5.74c0.761,1.838,2.221,3.298,4.059,4.059l86.104,35.665c0.919,0.38,1.895,0.571,2.87,0.571
		c0.976,0,1.951-0.19,2.87-0.571l59.566-24.676c1.838-0.761,3.298-2.221,4.059-4.059l35.667-86.105
		C196.528,70.368,196.528,68.303,195.767,66.465z M107.464,166.256l7.647-18.463l18.462,7.647L107.464,166.256z M149.112,145.639
		l-35.19-14.575c-3.823-1.583-8.214,0.232-9.799,4.059l-14.577,35.193l-72.248-29.925L64.672,26.023l114.367,47.371L149.112,145.639
		z"/>
        <polygon points="133.374,98.043 127.632,84.186 89.229,100.098 82.708,84.358 68.851,90.098 81.111,119.697 	"/>
      </g>
    </svg>
  )
}

