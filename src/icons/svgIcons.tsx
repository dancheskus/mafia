import React from 'react';

interface IProps {
  fill?: string;
  size?: string;
  className?: string;
}

export const EyeIcon = ({ fill = '#fff', size = '100%', className }: IProps) => (
  <svg width={size} height={size} viewBox='0 0 1115.9 738.5' className={className}>
    <path
      fill={fill}
      d='M450.8,11.5c128.6-26.2,265.9-7.2,382.3,53.4c124.6,63.3,223.6,174.2,274.1,304.2 c-27,69.3-67.3,133.4-118.5,187.3c-49.9,52.5-109.3,96.2-175.1,126.6c-31.3,14.2-63.3,27.3-96.8,35.4 c-80.6,21.2-165.8,26.3-248.1,11.8c-122-19.9-237.1-79.9-322.5-169.4c-53-55.1-95-120.6-122.8-191.8 C71.2,244.3,164.7,138.2,281.2,73.3C333.9,43.7,391.6,23.3,450.8,11.5 M547.9,123.6c-40.3,2.4-79.7,15.6-114.3,36.4 c-28.6,18.2-54,41.9-72.7,70.3c-38.1,56.1-50.4,128-35.8,193.9c13.1,59.7,49.4,114.1,100.1,148.2c34.2,23.6,74.6,38.2,116,41.4 c40.7,4.5,82.2-2.5,120.2-17.3c33.8-14.3,64.7-36,88.9-63.6c26.8-30.2,45.8-67.4,54.8-106.8c9.7-41,8.1-84.5-3.1-125 c-17.8-66.4-65.7-123.7-127.5-153.4C635.6,128.3,591.2,121.1,547.9,123.6z'
    />
    <path
      fill={fill}
      d='M538.6,223.9c31.2-5,64.1-1.4,92.8,12.5c27.5,12.9,50.4,35.1,64.4,62c14.4,27.8,19.9,60.1,16.1,91.1 c-5,38.3-24.9,75.1-56.2,98.1c-50.6,38.3-126.1,39.3-177.6,2.2c-27.3-19.1-46.7-48.5-55.2-80.5c-9.8-37.6-5.6-79,13.3-113.1 C456.7,257.7,495.9,231,538.6,223.9z'
    />
  </svg>
);

export const EyeIconCrossed = ({ fill = '#fff', size = '100%', className }: IProps) => (
  <svg width={size} height={size} viewBox='0 0 1115.9 738.5' className={className}>
    <path
      fill={fill}
      d='M511,2.5c20.6-2.1,41.3-2.4,62-2.5c50,0.8,100.1,7.6,148.3,21.2c36.2,9.7,71.1,23.7,104.7,40.1 c47.8,24.4,92.6,54.8,132,91.2c56.3,51.2,102.1,113.8,134,182.9c5.2,11.2,10.2,22.4,14.5,34c-14.5,37.1-32.7,72.8-54.6,106 c-17.7,27.6-38.3,53.2-60.4,77.4c41,22.8,82.4,45,123.6,67.5c1.7,0.6,0.3,2.2-0.1,3.2c-15.2,28-30.5,55.9-45.7,83.8 c-34.3-18.3-68.4-37.1-102.6-55.7c-17.6-9.6-35.3-19.1-52.9-28.8c-15,10.3-29.6,21.1-45.3,30.3c-75.8,46.9-162.8,75.2-251.6,83 c-117.8,10.7-238.8-15.3-341.4-74.4c-35.2-20.3-68.6-44-98.8-71.2c-25.4-22.3-48.3-47.3-69.3-73.7C83.5,486.6,63,453.5,45.5,419 c-8.2-16.1-15.4-32.7-22-49.5c9.5-26,22-50.8,35.3-75c17.1-30.3,36.9-59.1,59.3-85.7c3.6-4.5,7.4-8.8,11.1-13.2 c-43-23.6-86.1-47-129.2-70.4c15.4-29,31.3-57.7,47.1-86.6c52.6,28.4,105,57.3,157.6,85.8c15.1-11.4,30.2-22.7,46.3-32.7 c20.4-12.7,41.2-24.9,63-34.9C375.7,27.1,442.8,8.7,511,2.5 M452.7,149.4c-31.4,15.6-59.1,38.5-80.9,65.9 c29.4,16.1,58.9,32.1,88.4,48.2c11.8-11.7,25.8-21,40.8-28.1c34.2-15.7,74.3-18,110.1-6.9c30.4,9.4,57.7,29.1,75.6,55.5 c23,33.3,30.7,76.1,23.2,115.6c29.6,16.2,59.1,32.5,88.9,48.3c19.6-59.6,15.8-126.6-10.4-183.7c-14.1-30.8-34.9-58.3-60.4-80.6 c-24.5-21.4-53.4-37.7-84.3-47.8c-22.1-7.7-45.5-11-68.8-12.4C532.8,121.6,490.2,130.3,452.7,149.4 M327.4,303.5 c-15.2,56.6-10.3,118.6,14.7,171.7c13.9,29.8,33.8,56.9,58.5,78.6c25.4,22.6,55.6,39.9,88.1,50c64,20.3,136.3,13.9,195.3-18.3 c24.5-13.5,47.1-30.8,65.3-52.1c-6-3.6-12.2-6.7-18.3-10.1c-24-13-47.8-26.3-71.9-39c-12.1,9.8-25.8,17.6-40.3,23.1 c-42.3,15.7-91.8,12.1-130.8-11c-30.4-17.8-53.5-47.3-63.8-81c-6.3-20.2-8.1-41.7-6.3-62.7C387.7,336.3,357.7,319.7,327.4,303.5z'
    />
  </svg>
);

export const DonRingIcon = ({ fill = '#fff', size = '100%', className }: IProps) => (
  <svg width={size} height={size} viewBox='0 0 120.771 162.202' className={className}>
    <g transform='translate(-51.974 -49.152)'>
      <path
        fill={fill}
        d='M74.336,61.8c4.205-4.679,8.517-9.275,12.71-13.966,14.89,0,29.767.13,44.657.213,4.241,4.6,8.529,9.145,12.757,13.741Q136.411,77.011,128.4,92.262c17.093,5.816,31.461,19.367,37.585,36.436A60.361,60.361,0,1,1,66.1,107.767a61.376,61.376,0,0,1,24.33-15.423Q82.455,77.029,74.336,61.8M92.85,52.3l5.65,6.4c1.978-2.132,3.945-4.252,5.9-6.4q-5.775-.018-11.549,0m21.547.012c1.883,2.132,3.779,4.252,5.674,6.385l5.9-6.4q-5.792-.018-11.573.012M82.4,59.628c3.779.012,7.569.012,11.348,0-1.883-2.132-3.779-4.264-5.662-6.4q-2.861,3.2-5.686,6.4m21.1.237c3.862.012,7.711.024,11.573,0-1.883-2.132-3.767-4.252-5.662-6.385-1.978,2.132-3.945,4.252-5.911,6.385m27.446-6.136c-1.966,2.037-3.944,4.087-5.9,6.136,3.933.024,7.865.012,11.81,0q-2.949-3.074-5.911-6.136M81.952,64.141c4.857,7.534,9.843,14.984,14.665,22.53a26.465,26.465,0,0,0,3.554,4.17c-.438-8.955-2.132-17.78-3.068-26.688-5.058-.012-10.1-.036-15.15-.012m19.876,0c2.239,8.351,4.039,16.82,6.539,25.088.509,0,1.552-.012,2.073-.012,2.642-8.268,4.608-16.737,7-25.077q-7.8-.018-15.612,0m16.619,26.688c6.894-8.114,11.857-17.709,17.946-26.439q-7.214-.018-14.416-.012c-1.137,8.813-3.08,17.555-3.53,26.451m-19.142,12.5a47.293,47.293,0,1,0,56.668,40.724A47.878,47.878,0,0,0,135.73,110.5,47.139,47.139,0,0,0,99.306,103.325Z'
        transform='translate(2.965 1.321)'
      />
    </g>
  </svg>
);

export const SheriffOkIcon = ({ fill = '#fff', size = '100%', className }: IProps) => (
  <svg width={size} height={size} viewBox='0 0 140.71 211.786' className={className}>
    <g transform='translate(-136.646 -196.214)'>
      <path
        fill={fill}
        d='M150.68,13.167c2.532-.494,5.835-2.1,7.837.313a34.088,34.088,0,0,1,.506,5.642c1.169,30.249,2.508,60.487,3.472,90.748,1.374-17.638,1.616-35.361,2.918-53,.651-7.342,8.126-12.671,15.275-11.357,2.182.784,1.531,3.147,1.4,4.907-3.8,32.6-7.378,65.237-11.224,97.837-3.629,20.821-7.861,41.57-10.38,62.572-.627,3.8-.06,7.981-2,11.441-2.23,1.724-5.208,1.64-7.885,1.7q-26.566-.072-53.144-.012c-2.025-.157-4.786.121-5.992-1.929a86.759,86.759,0,0,0-5.98-9.959c-14.021-19.4-29.044-38.05-43.909-56.8,3.713-11.538,7.957-22.907,12.225-34.252.965-3.171,4.883-2.158,7.2-1.35,5.088,1.555,8.488,6.486,9.018,11.646,1.121,6.4-1.76,12.539-1.833,18.9,8.608,4.184,17.084,8.693,26.15,11.791,2.809.784,6.113,2.146,8.789.229,6.245-3.653,11.815-8.331,17.47-12.84.711-8.03,1.362-16.059,2.038-24.1-4.859-4.533-9.971-8.861-14.19-14.034-5.027,1.061-10.212,1.447-15.155,2.894-4.666,4.473-9.512,9.657-16.24,10.706-4.786-.326-8.946-3.472-12.382-6.583-1.326-1.025-.229-2.6.482-3.593,4.087-5.558,8.427-10.923,12.49-16.493,1.82-2.327,3.472-5.293,6.715-5.7,8.777-2.242,17.421-5.1,26.343-6.752,6.378,3.3,11.888,8.222,17.94,12.141,3.171,2.375,6.908,4.2,9.416,7.33,6.076,9.332,11.345,19.206,17.614,28.4,3.7.9,1.676-2.676.615-4.328-4.943-7.957-9.778-15.975-14.648-23.968-2.689-4.7-8.343-6.137-12.225-9.549-2.918-7.728-3.291-16.228-6.1-24.016-4.388-9.645-9.368-19.025-13.431-28.815-2.942-7.21,1.157-16.035,8.476-18.579,2.544-.952,6.9-2.749,8.21.832C137.96,50.325,149.245,75.523,159,101.347c-2.315-9.03-5.353-17.855-7.945-26.813-2.532-9.271-7.547-17.578-10.887-26.536a115.859,115.859,0,0,1-.663-25.113C140.058,17.254,145.905,14.566,150.68,13.167Z'
        transform='translate(95.075 184.028)'
      />
    </g>
  </svg>
);

export const SheriffStarIcon = ({ fill = '#fff', size = '100%', className }: IProps) => (
  <svg width={size} height={size} viewBox='0 0 328.9 373' className={className}>
    <path
      fill={fill}
      d='M150.9,9.1c3.5-5.9,10.3-9.6,17.1-9c7.7,0.2,14.8,6,16.7,13.5c1.7,6.7-0.1,15.1-6.1,19c0.7,3,2.7,5.4,4.1,8 c11.5,20.2,23.3,40.1,34.7,60.4c24.8,0.4,49.7,0,74.5,0.2c1.1-5.3,3.9-10.5,8.7-13.1c6.8-4.4,16.7-3.5,22.5,2.2 c2.6,2.8,4.8,6.3,5.4,10.2c1.8,8.5-3.4,17.8-11.6,20.6c-4.4,1.8-9.2,1.2-13.6,0.1c-12,22.5-24.5,44.7-36.6,67.1 c12.1,22.5,24.7,44.8,36.6,67.3c6-2.2,13.1-1.5,18.2,2.5c4.3,3.1,6.8,8.1,7.4,13.2c0.5,7.5-3.7,15.3-10.7,18.4 c-7.2,3.4-16.6,1.5-21.7-4.7c-2.5-2.6-3.6-6.2-4.6-9.6c-26.1,0.2-52.3-0.1-78.4,0.2c-12.2,21.3-24.4,42.7-36.9,63.9 c2.7,3.2,5.6,6.5,6.4,10.8c0.7,4.6,0.6,9.8-2.2,13.7c-3.8,7.1-13,10.6-20.7,8.3c-5.8-1.3-10.5-5.9-12.6-11.4 c-1.4-4.7-1.3-10,0.8-14.5c1.2-2.6,3.4-4.6,5.1-6.9c-9.3-14.6-18-29.6-27.2-44.3c-4.1-7-8.6-13.7-12.4-20.9 c-25.7-0.5-51.4-1.4-77.1-1.6c-0.6,6.1-4.9,11.4-10.2,14.1c-6.3,2.8-14.2,2.1-19.5-2.3c-5-3.7-7.4-10.2-6.9-16.2 c0.7-7.6,6.4-14.5,13.9-16.2c3.9-1.3,7.9-0.1,11.8,0.5c5.4-10.6,11.9-20.5,17.6-30.9c6.5-11.2,12.8-22.4,19.4-33.6 c0.5-1.2,1.6-2.3,1.5-3.6c-12.2-21.3-24.7-42.5-36.8-63.9c-4.9,1.4-10.5,1.7-15.1-0.7c-7-3.1-11.1-11.1-10.3-18.6 c0.6-6.7,5.3-12.8,11.5-15.3c5.6-2.3,12.1-1.6,17.1,1.7c4.5,2.7,7.2,7.7,8.1,12.8c23-0.2,46.2-1.1,69.3-1.4 c2.9-0.8,7.1,1.3,8.6-2.1c12.8-21.3,25.8-42.4,38.6-63.7C148.4,27.4,146.4,16.9,150.9,9.1 M162.4,7.8c-5.3,2.1-8.6,8.5-6.6,14 c1.3,4.5,5.4,7.9,10.1,8.3c7.3,0.8,14-6.5,12.4-13.7C177.2,9.3,169,4.8,162.4,7.8 M162,36.2c-14.1,23.2-28.1,46.4-42.3,69.5 c-27.1,0.6-54.2,1.3-81.3,1.7c-0.5,3.4-2.6,6.3-4.8,8.8c13,22.9,26.3,45.7,39.4,68.5c-13.9,23.9-27.6,47.9-41.5,71.8 c2.3,2.4,4.2,5.3,4.9,8.7c27.2,1,54.4,1.1,81.6,2.1c13.8,23.2,28,46.2,41.9,69.3c3.4-0.8,6.9-0.6,10.3-0.1 c12.9-22.8,26.3-45.3,39.1-68.1c27.8-0.3,55.6,0.1,83.3-0.2c0.2-3.6,3-6,4.5-8.9c-12.8-23.7-25.8-47.3-38.7-70.9 c12.7-23.8,26-47.3,38.7-71.1c-1.5-2.9-4.3-5.2-4.5-8.8c-26.5-0.6-53,0.2-79.5-0.4C199.7,84,185.6,60.3,172,36.3 C168.7,37.2,165.2,37.4,162,36.2 M17.5,91.8c-7.4,1.8-11.3,11.3-6.6,17.6c3.8,6.4,13.8,7.1,18.4,1.2c3.9-4.4,3.8-11.9-0.7-15.8 C25.9,91.8,21.3,90.8,17.5,91.8 M302.3,95.5c-6.6,5.5-3.3,17.3,4.8,19.3c8.4,2.9,17.6-6.4,14.3-14.7 C319.3,92.2,307.6,89.1,302.3,95.5 M16.2,258.5c-3.7,1-7.1,3.5-8.5,7.2c-2.3,5.6,0.6,12.6,6.2,14.9c7.1,3.5,16.3-2.4,16.1-10.3 C30.6,263.1,23.2,256.9,16.2,258.5 M306.5,261.8c-3,1.1-5.5,3.4-6.8,6.3c-3.4,7.1,2.4,16.4,10.3,16.2c7.3,0.6,13.6-7.1,11.6-14.1 C320.4,263.7,312.8,259.5,306.5,261.8 M161.2,343.5c-3.5,1.2-6.4,4.1-7.4,7.7c-1.5,4.6,0.5,10.2,4.6,12.8 c4.2,3.2,10.7,2.7,14.4-1.1c4.1-3.4,4.9-10,2.1-14.4C172.2,343.9,166.2,341.7,161.2,343.5z'
    />
    <path
      fill={fill}
      d='M166.7,43.6c1.1,0,1.2,1.5,1.8,2.1c13.4,23.5,27,47,40.6,70.4c25.7,0.1,51.4,0,77.1,0.1 c0.9-0.1,1.9-0.1,2.8-0.3c-12.8,24.3-26.5,48.2-39.4,72.4c13.1,24,26,48.1,39.5,71.8c-1.9,0.9-4,0.3-6,0.4c-26,0-52,0-78.1,0 c-13.3,23-26.6,46.1-39.8,69.2c-1.5-1.1-2.2-2.8-3.1-4.4c-13.4-21.9-26.7-43.9-40-65.8c-27.4-0.6-54.7-1.2-82.1-1.9 c1.2-3.1,3.1-5.8,4.7-8.7c11.3-19.6,22.7-39.2,34-58.8c0.8-1.9,2.6-3.6,2.7-5.7c-13.2-23-26.6-46-39.7-69.1 c21.4,0,42.8-1.2,64.2-1.2c6-0.5,12,0,18-0.8C138.6,90.3,152.3,66.7,166.7,43.6 M166.4,49.1c-13,22.6-27.1,44.6-40.4,67.1 c-26.4,1.2-52.8,1.1-79.2,2.2c12.7,22.3,26,44.3,38.3,66.8c-4.1,6.7-7.9,13.6-11.9,20.4C64,222,54.1,238.2,45,254.8 c26.3,0.5,52.6,1.4,78.9,1.7c12.5,20.8,25.2,41.5,37.8,62.3c1.1,1.7,2.2,3.3,2.8,5.2c0.8-0.7,1.4-1.5,2-2.4 c12.3-21.4,24.7-42.8,37-64.3c26.8,0.4,53.7-0.2,80.5,0.3c-1.6-4.2-4.2-8-6.2-12c-10.6-19.1-20.9-38.3-31.5-57.4 c12.5-23.3,25.5-46.3,37.9-69.7c-25.6,0.3-51.3,0.1-76.9,0.1c-13-22.5-26-45-38.9-67.5C167.7,50.4,167.1,49.7,166.4,49.1z'
    />
    <path
      fill={fill}
      d='M129.9,123.4C142,103,154.7,83,166.7,62.5c12.1,21.2,24.4,42.3,36.6,63.5c23,0.1,45.9-0.1,68.9,0.1 c-11.5,20.6-22.6,41.5-34.1,62.1c11.4,20.7,22.8,41.4,34,62.2c-24.3,0-48.6,0-72.8,0c-11.7,19.8-22.8,40.1-34.8,59.8 c-12-20.4-24.6-40.4-36.7-60.7c-23.6-0.2-47.2-1.4-70.9-1.3c11.7-20.9,23.9-41.4,35.7-62.2c1-1.2-0.3-2.6-0.8-3.7 c-9.6-16.7-19.2-33.3-28.8-50c-1.3-2.5-3-4.7-3.9-7.3C82.7,124.6,106.3,123.9,129.9,123.4 M166.3,68.7 c-11.2,19.3-23.4,38.1-34.5,57.5c-22.6,0.6-45.2,1.1-67.8,1.5c10.8,19,21.7,38,32.7,56.8c-11.4,20.4-23.2,40.5-34.9,60.7 c9.7-0.1,19.4,0.5,29.1,0.5c12.9,0.7,25.8,0.2,38.6,1c11.7,19.2,23.3,38.4,35.1,57.5c10.9-19,21.8-37.9,32.8-56.9 c23.2-0.2,46.5,0,69.7-0.1c-4.1-7.6-8.5-15.1-12.3-22.8c0.2-0.2,0.7-0.7,0.9-0.9c-2.2,0.3-2.7-2.2-3.6-3.7 c-5.8-10.6-11.8-21.1-17.2-31.8c10.2-20,21.8-39.3,32-59.3c-21.9,0.3-43.8,0.2-65.7,0.1c-6.9-12.9-14.6-25.3-21.7-38.1 C174.9,83.6,171.3,75.7,166.3,68.7z'
    />
  </svg>
);

export const ThumbUpIcon = ({ fill = '#fff', size = '100%', className }: IProps) => (
  <svg width={size} height={size} viewBox='0 0 172.626 206.896' className={className}>
    <g transform='translate(-121.001 -200)'>
      <path
        fill={fill}
        d='M255.3,122.323c8.446-6.63,17.187-27.765-8.657-33.888-18.58-4.349-31.058,8.889-39.884-10.578C198.648,60.016,223.647,27.67,196.431,12.4c-10.008-5.637-19.235-2.048-18.263,13.323,1.816,30.826-16.807,35.239-30.657,64.08-13.217,7.728-23.985,11.971-37.266,19.868l-19.045.19v89.67h17.693l13.661,3.991c20.924,10.979,46.767,13.259,64.735,13.259,10.831,0,32.642-1.013,39.757-6.714,8.065-6.44,10.388-16.785,11.106-21.135,14.041-5.637,17.8-17.377,12.647-30.108,6.081-3.336,9.839-7.812,11.211-13.281C264.818,134.484,257.386,125.954,255.3,122.323Z'
        transform='translate(29.801 190.11)'
      />
    </g>
  </svg>
);

export const ThumbDownIcon = ({ fill = '#fff', size = '100%', className }: IProps) => (
  <svg width={size} height={size} viewBox='0 0 172.626 206.896' className={className}>
    <g transform='translate(-121 -200)'>
      <path
        fill={fill}
        d='M255.3,122.323c8.446-6.63,17.187-27.765-8.657-33.888-18.58-4.349-31.058,8.889-39.884-10.578C198.648,60.016,223.647,27.67,196.431,12.4c-10.008-5.637-19.235-2.048-18.263,13.323,1.816,30.826-16.807,35.239-30.657,64.08-13.217,7.728-23.985,11.971-37.266,19.868l-19.045.19v89.67h17.693l13.661,3.991c20.924,10.979,46.767,13.259,64.735,13.259,10.831,0,32.642-1.013,39.757-6.714,8.065-6.44,10.388-16.785,11.106-21.135,14.041-5.637,17.8-17.377,12.647-30.108,6.081-3.336,9.839-7.812,11.211-13.281C264.818,134.484,257.386,125.954,255.3,122.323Z'
        transform='translate(384.826 416.786) rotate(180)'
      />
    </g>
  </svg>
);

export const RandomCubeIcon = ({ fill = '#fff', size = '100%', className }: IProps) => (
  <svg width={size} height={size} viewBox='0 0 112.843 123.494' className={className}>
    <path
      fill={fill}
      d='M122.339,44.764A10.354,10.354,0,0,0,117.252,46L71.9,72.229c-2.841,1.644-2.841,4.242,0,5.886l45.349,26.232a11.114,11.114,0,0,0,10.174,0l45.349-26.232c2.841-1.643,2.841-4.242,0-5.886L127.426,46a10.347,10.347,0,0,0-5.087-1.233Zm-.245,15.767a14.846,14.846,0,0,1,7.217,1.838,6.265,6.265,0,0,1,2.87,2.8,6.829,6.829,0,0,1,.077,4.116l-.475,1.694a5.011,5.011,0,0,0-.2,2.615,2.5,2.5,0,0,0,1.259,1.349l1.006.563-9.867,5.528-1.1-.614a4.912,4.912,0,0,1-2.34-2.322,7.3,7.3,0,0,1,.176-4.158l.452-1.706a4.527,4.527,0,0,0,.077-2.5,2.624,2.624,0,0,0-1.319-1.567,6.1,6.1,0,0,0-3.75-.63,11.933,11.933,0,0,0-4.557,1.551,17.5,17.5,0,0,0-4.023,3.105,19.037,19.037,0,0,0-3.143,4.242l-7.021-3.934a50.066,50.066,0,0,1,4.654-4.16,38.383,38.383,0,0,1,4.828-3.206,34.357,34.357,0,0,1,12.4-4.443,20.357,20.357,0,0,1,2.767-.165Zm15.068,16.833,7.961,4.46-9.867,5.528-7.961-4.46,9.867-5.528Zm-68.288,5.72c-1.708-.046-2.869,1.287-2.869,3.646v46.816a11.14,11.14,0,0,0,5.088,8.814l43.62,25.189c2.841,1.641,5.088.343,5.088-2.938V117.794a11.139,11.139,0,0,0-5.088-8.814L71.094,83.791a4.762,4.762,0,0,0-2.219-.709Zm107.1,0a4.761,4.761,0,0,0-2.219.708l-43.621,25.189a11.14,11.14,0,0,0-5.088,8.814v46.817c0,3.28,2.247,4.577,5.088,2.936l43.622-25.188a11.138,11.138,0,0,0,5.088-8.814V86.73c0-2.358-1.161-3.691-2.869-3.645ZM80.521,102.01a38.531,38.531,0,0,1,5.33,1.488,29.566,29.566,0,0,1,4.655,2.175,27.8,27.8,0,0,1,8.971,7.743,15.565,15.565,0,0,1,3.087,9.215,7.249,7.249,0,0,1-.94,3.967,7,7,0,0,1-3.207,2.4l-1.544.57a4.962,4.962,0,0,0-2.146,1.324,2.892,2.892,0,0,0-.506,1.809v1.153l-8.706-5.027v-1.256a5.691,5.691,0,0,1,.8-3.257,7.322,7.322,0,0,1,3.352-2.217l1.544-.6a4.539,4.539,0,0,0,2-1.356,3.048,3.048,0,0,0,.651-1.982,5.99,5.99,0,0,0-1.158-3.462,9.693,9.693,0,0,0-3.231-2.892,13.493,13.493,0,0,0-4.221-1.565,15.178,15.178,0,0,0-4.727-.191V102.01Zm80.02,2.555a5.125,5.125,0,0,1,1.256.146q3.087.755,3.087,5.651a14.486,14.486,0,0,1-.941,5.054,34.883,34.883,0,0,1-3.207,6.106l-1.544,2.352a25.37,25.37,0,0,0-2.146,3.8,6.32,6.32,0,0,0-.506,2.394v1.153l-8.706,5.027v-1.256a11.585,11.585,0,0,1,.8-4.176,37.158,37.158,0,0,1,3.352-6.087l1.544-2.378a23.035,23.035,0,0,0,2-3.668,7.249,7.249,0,0,0,.651-2.734q0-1.794-1.157-2.125-1.158-.356-3.232.84a22.59,22.59,0,0,0-4.22,3.309,50.462,50.462,0,0,0-4.727,5.267v-8.048q2.918-2.761,5.329-4.666a39.193,39.193,0,0,1,4.655-3.2q4.782-2.761,7.716-2.763ZM85.513,132.625l8.706,5.026v9.125l-8.706-5.026v-9.124Zm71.026,2.393v9.124l-8.706,5.026v-9.124l8.706-5.027Z'
      transform='translate(-66.006 -44.764)'
    />
  </svg>
);

export const ListIcon = ({ fill = '#fff', size = '100%', className }: IProps) => (
  <svg width={size} height={size} viewBox='0 0 109 109' className={className}>
    <path
      fill={fill}
      d='M50.875,16.818H119V30.443H50.875Zm0,40.875H119V71.318H50.875Zm0,40.875H119v13.625H50.875ZM10,23.625A13.625,13.625,0,1,1,23.625,37.25,13.619,13.619,0,0,1,10,23.625ZM10,64.5A13.625,13.625,0,1,1,23.625,78.125,13.619,13.619,0,0,1,10,64.5Zm0,40.875A13.625,13.625,0,1,1,23.625,119,13.619,13.619,0,0,1,10,105.375Z'
      transform='translate(-10 -10)'
    />
  </svg>
);

export const MaximizeIcon = ({ fill = '#fff', size = '100%', className }: IProps) => (
  <svg width={size} height={size} viewBox='0 0 16 16' className={className}>
    <path
      fill={fill}
      d=' M 6.40 0.00 L 9.41 0.00 C 9.41 2.13 9.41 4.26 9.41 6.39 C 11.61 6.40 13.81 6.42 16.00 6.49 L 16.00 9.35 C 13.80 9.40 11.61 9.41 9.41 9.42 C 9.41 11.61 9.40 13.81 9.36 16.00 L 6.50 16.00 C 6.41 13.81 6.39 11.62 6.40 9.42 C 4.26 9.41 2.13 9.41 0.00 9.40 L 0.00 6.40 C 2.13 6.40 4.27 6.40 6.40 6.40 C 6.40 4.27 6.40 2.13 6.40 0.00 Z'
    />
  </svg>
);

export const MinimizeIcon = ({ fill = '#fff', size = '100%', className }: IProps) => (
  <svg width={size} height={size} viewBox='0 0 16 3' className={className}>
    <path fill={fill} d=' M 0.00 0.00 L 16.00 0.00 L 16.00 3.00 L 0.00 3.00 L 0.00 0.00 Z' />
  </svg>
);

export const PauseIcon = ({ fill = '#fff', size = '100%', className }: IProps) => (
  <svg width={size} height={size} viewBox='0 0 512 512' className={className}>
    <path
      fill={fill}
      opacity='1.00'
      d=' M 197.06 96.25 C 206.49 94.16 216.39 102.36 215.97 112.03 C 216.05 207.69 215.99 303.35 216.01 399.01 C 216.50 405.76 212.24 412.43 205.96 414.89 C 198.88 417.85 189.88 414.81 186.17 408.06 C 183.37 403.54 184.00 398.06 183.98 393.00 C 184.02 299.32 183.96 205.63 184.01 111.95 C 183.87 104.46 189.71 97.53 197.06 96.25 Z'
    />
    <path
      fill={fill}
      opacity='1.00'
      d=' M 308.36 96.40 C 317.98 93.80 328.33 102.05 328.00 111.99 C 328.01 207.66 328.01 303.33 328.01 398.99 C 328.67 407.52 321.58 415.66 313.01 415.97 C 304.16 416.82 295.74 408.96 296.02 400.08 C 295.96 304.36 296.00 208.65 296.00 112.93 C 295.48 105.36 300.88 97.95 308.36 96.40 Z'
    />
  </svg>
);

export const PlayIcon = ({ fill = '#fff', size = '100%', className }: IProps) => (
  <svg width={size} height={size} viewBox='-27 0 512 512' className={className}>
    <path
      fill={fill}
      d=' M 135.50 96.66 C 139.82 95.41 144.65 96.05 148.43 98.53 C 225.49 146.44 302.51 194.41 379.57 242.31 C 386.08 246.17 389.10 254.86 386.13 261.88 C 384.61 266.12 380.98 269.05 377.16 271.18 C 300.70 318.74 224.24 366.30 147.79 413.88 C 141.42 417.85 132.46 415.96 127.85 410.17 C 125.30 407.06 124.09 403.01 124.22 399.02 C 124.25 303.32 124.21 207.62 124.24 111.92 C 124.13 105.10 128.87 98.46 135.50 96.66 M 156.28 140.85 C 156.17 217.63 156.28 294.42 156.23 371.20 C 217.72 332.92 279.28 294.71 340.74 256.38 C 340.73 256.18 340.70 255.79 340.69 255.59 C 279.27 217.28 217.76 179.08 156.28 140.85 Z'
    />
  </svg>
);

export const ResetIcon = ({ fill = '#fff', size = '100%', className }: IProps) => (
  <svg width={size} height={size} viewBox='0 0 1200 1200' className={className}>
    <path
      fill={fill}
      d='M115.5,475.5l0.2,0c2.3-15.4,15.5-27.2,31.5-27.2c17.7,0,32,14.3,32,32c0,0.8-0.2,1.5-0.2,2.3l0.4,0l-0.7,3.1 c-0.1,0.8-0.3,1.7-0.6,2.5l-3.7,16.5c-7,31.1-10.5,63.2-10.5,95.3c0,240.5,195.7,436.2,436.2,436.2 c240.5,0,436.2-195.7,436.2-436.2S840.5,163.8,600,163.8c-101.1,0-199.2,35.5-277.3,100l46,57.1l-180.7,21.3l55.1-177l39.5,49 C372.1,140.5,484.4,100,600,100c275.7,0,500,224.3,500,500c0,275.7-224.3,500-500,500c-275.7,0-500-224.3-500-500 c0-35.7,3.9-71.5,11.6-106.6L115.5,475.5z'
    />
  </svg>
);

export const NextIcon = ({ fill = '#fff', size = '100%', className }: IProps) => (
  <svg width={size} height={size} viewBox='-1.3 0 9.648 16.373' className={className}>
    <path
      fill={fill}
      d='M631.039,4.839a1.413,1.413,0,0,0,0,2.047l5.7,5.7-5.7,5.7a1.447,1.447,0,0,0,2.047,2.047l6.725-6.725a1.413,1.413,0,0,0,0-2.047l-6.725-6.725A1.413,1.413,0,0,0,631.039,4.839Z'
      transform='translate(-630.6 -4.4)'
    />
  </svg>
);

export const TargetIcon = ({ fill = '#fff', size = '100%', className }: IProps) => (
  <svg width={size} height={size} viewBox='0 0 512 512' className={className}>
    <path
      fill={fill}
      d=' M 240.00 20.93 C 240.17 12.63 247.70 5.27 256.01 5.33 C 264.28 5.30 271.85 12.58 271.96 20.89 C 272.09 33.13 271.97 45.37 272.01 57.61 C 309.35 60.83 345.70 74.75 375.63 97.31 C 401.69 116.84 422.92 142.81 436.64 172.35 C 446.54 193.60 452.62 216.63 454.41 240.01 C 466.63 240.00 478.86 239.93 491.08 240.04 C 500.07 240.11 507.85 249.02 506.54 257.95 C 505.52 265.88 498.01 272.34 489.98 272.03 C 478.12 271.99 466.25 272.01 454.39 272.02 C 451.01 311.26 435.79 349.40 411.18 380.16 C 389.89 406.92 361.65 428.21 329.85 440.87 C 311.41 448.30 291.83 452.89 272.01 454.40 C 272.02 466.27 271.99 478.14 272.03 490.00 C 272.34 498.05 265.83 505.57 257.87 506.55 C 248.97 507.81 240.10 500.04 240.04 491.08 C 239.92 478.85 240.01 466.62 240.00 454.40 C 211.04 451.87 182.64 442.98 157.42 428.53 C 129.89 412.84 106.15 390.54 88.87 363.98 C 70.97 336.59 60.06 304.65 57.61 272.02 C 45.38 271.96 33.15 272.09 20.93 271.96 C 12.61 271.87 5.32 264.32 5.33 256.04 C 5.25 247.73 12.61 240.18 20.91 240.01 C 33.14 239.96 45.37 240.02 57.61 239.98 C 61.01 200.52 76.37 162.16 101.24 131.31 C 126.55 99.63 161.73 75.84 200.77 64.71 C 213.55 60.99 226.72 58.62 240.00 57.59 C 240.00 45.37 239.97 33.15 240.00 20.93 M 123.79 153.75 C 104.53 178.50 92.52 208.77 89.58 240.00 C 101.41 240.00 113.24 239.95 125.06 240.02 C 133.06 240.08 140.21 246.96 140.76 254.91 C 141.55 263.62 133.78 271.98 125.07 271.97 C 113.25 272.05 101.43 272.00 89.61 271.99 C 93.48 316.28 116.35 358.34 151.03 386.07 C 176.26 406.53 207.59 419.40 239.96 422.39 C 240.07 410.56 239.90 398.73 240.03 386.91 C 240.05 378.53 247.66 371.11 256.02 371.20 C 264.40 371.14 271.89 378.59 272.01 386.95 C 272.01 398.77 272.02 410.59 272.00 422.42 C 310.28 418.88 346.90 401.23 373.99 374.02 C 401.22 346.93 418.88 310.30 422.41 272.00 C 412.61 272.03 402.80 272.00 393.00 272.01 C 389.39 271.97 385.64 272.42 382.19 271.12 C 375.56 268.86 370.69 262.01 371.24 254.94 C 371.74 246.99 378.90 240.06 386.90 240.03 C 398.73 239.90 410.56 240.07 422.39 239.96 C 418.70 198.33 398.33 158.61 367.00 131.02 C 340.77 107.64 307.01 92.82 272.00 89.60 C 271.99 101.41 272.06 113.21 271.97 125.02 C 272.01 133.74 263.65 141.53 254.94 140.76 C 246.96 140.23 240.06 133.04 240.02 125.01 C 239.95 113.20 240.00 101.39 240.00 89.59 C 194.57 93.61 151.48 117.56 123.79 153.75 Z'
    />
  </svg>
);

export const MutedIcon = ({ fill = '#fff', size = '100%', className }: IProps) => (
  <svg width={size} height={size} viewBox='0 0 776.5 776.5' className={className}>
    <path
      fill={fill}
      d='M365.6,0.7C428.2-3,491.8,8.6,548.9,34.7c66.3,30.1,123.8,79.4,163.7,140.2c22.8,34.5,39.9,72.6,50.6,112.5 c23.5,87.3,15.5,182.9-23.1,264.8C709.9,617.4,661,673.7,601,713c-34,22.4-71.6,39.3-110.9,50c-84.7,23.1-177.1,16.4-257.5-19 c-68.4-29.9-127.7-80-168.7-142.3c-21.1-32-37.4-67.1-48.2-103.9c-22.8-77.4-20.7-161.9,6.1-238c16.4-47,42.1-90.7,75-128 c33.4-37.9,74.2-69.3,119.5-91.7C262.7,17,313.8,3.6,365.6,0.7 M377.6,60.8c-72.8,2.1-144.5,29.7-200.1,76.8 c-49.7,41.7-86.7,98.4-104.4,160.8c-13.2,46-16,94.8-8.4,142c6.8,42.6,22.2,83.7,45,120.3c34.9,56.4,87.3,101.8,148.1,128.1 c72.7,31.9,157.3,35.7,232.6,10.7c35.2-11.6,68.5-29.3,97.8-52c50.7-39.1,89.7-93.4,110.2-154.1c16-46.8,21-97.2,14.8-146.2 c-4.7-37.2-15.8-73.6-32.8-107C650,180,600.3,129.6,540.4,98.1C490.6,71.8,433.9,58.9,377.6,60.8z'
    />
    <path
      fill={fill}
      d='M254.8,238c13.5-2.8,28-0.8,40.3,5.6c11.9,6.2,21.7,16.4,27.2,28.7c6.8,14.7,7.2,32.1,1.2,47.2 c-5.2,13.5-15.5,24.9-28.4,31.6c-10.9,5.7-23.5,7.9-35.7,6.4c-15.5-1.9-30.2-10.1-39.8-22.5c-11.3-14-15.6-33.3-11.7-50.8 C212.7,261.3,231.8,242.4,254.8,238z'
    />
    <path
      fill={fill}
      d='M497.7,237.9c12-2.3,24.8-1,36,3.9c13.7,6,25.1,17.3,31.1,30.9c7.1,15.9,6.9,34.9-0.6,50.5c-5.8,12.4-16,22.6-28.3,28.6 c-13.7,6.7-30.1,7.9-44.6,3.3c-12.9-4-24.4-12.6-32-23.8c-9.3-13.5-12.6-31-9-47C455,261.2,474.5,242.1,497.7,237.9z'
    />
    <path
      fill={fill}
      d='M233.9,409.1c52.4,25.9,104.8,51.8,157.2,77.6c55.2-18.6,110.4-37.3,165.7-55.9c7.3,22.1,14.6,44.1,21.8,66.3 c-33.1,11.1-66.3,22.1-99.4,33.2c31.6,15.8,63.1,31.6,94.7,47.3c-10.4,20.8-20.8,41.6-31.2,62.5c-52.4-25.8-104.8-51.8-157.2-77.6 c-55.6,18.6-111.1,37.3-166.7,55.8c-7.3-22.1-14.5-44.2-21.8-66.3c33.4-11.4,66.9-22.7,100.3-34.1c-31.5-15.5-63.1-30.9-94.7-46.4 C213,450.7,223.5,429.9,233.9,409.1z'
    />
  </svg>
);

export const CylinderIcon = ({ fill = '#fff', size = '100%', className }: IProps) => (
  <svg width={size} height={size} viewBox='0 0 512 512' className={className}>
    <path
      fill={fill}
      opacity='1.00'
      d=' M 231.18 20.69 C 247.12 18.10 263.45 18.00 279.42 20.37 C 293.63 22.64 307.73 25.58 321.64 29.26 C 324.92 38.35 330.05 46.64 335.48 54.59 C 343.76 66.10 353.56 76.93 365.95 84.08 C 383.69 93.52 405.09 92.10 423.77 86.36 C 435.82 101.72 447.74 117.21 458.69 133.39 C 473.35 153.51 482.37 177.10 489.17 200.87 C 475.09 210.93 468.22 228.04 465.31 244.55 C 462.67 261.60 462.53 279.49 467.97 296.03 C 471.31 306.01 477.22 315.57 486.34 321.20 C 479.79 341.59 473.32 362.21 463.07 381.11 C 452.14 400.09 437.44 416.49 423.05 432.87 C 401.66 430.87 379.39 431.49 359.08 439.14 C 343.95 444.66 333.04 457.70 325.43 471.41 C 322.98 476.50 319.26 481.46 319.87 487.41 C 318.50 488.06 317.54 489.19 316.82 490.50 C 277.17 499.86 235.38 499.83 195.72 490.50 C 195.08 489.12 194.10 488.03 192.69 487.44 C 192.71 484.78 192.73 482.03 191.33 479.66 C 183.61 463.02 172.03 446.50 154.42 439.46 C 133.95 431.50 111.46 430.98 89.84 432.74 C 88.03 431.80 87.00 429.80 85.59 428.37 C 72.69 413.77 59.91 398.84 50.00 381.99 C 39.40 362.88 32.84 341.92 26.25 321.19 C 39.31 313.08 45.41 297.69 47.77 283.11 C 50.35 264.44 49.13 244.94 42.57 227.16 C 38.64 216.95 32.45 207.25 23.41 200.86 C 30.21 177.18 39.16 153.69 53.74 133.61 C 64.68 117.33 76.65 101.77 88.79 86.37 C 104.74 91.26 122.30 93.04 138.38 87.70 C 149.36 84.13 158.29 76.35 166.15 68.16 C 174.96 58.56 182.37 47.69 188.16 36.02 C 189.24 33.87 190.09 31.62 190.80 29.32 C 204.08 25.66 217.60 22.93 231.18 20.69 M 243.44 38.71 C 226.29 41.51 210.41 51.08 199.80 64.82 C 189.01 78.59 183.78 96.55 185.43 113.96 C 186.72 129.46 193.47 144.43 204.19 155.69 C 215.07 167.38 230.13 175.07 245.97 177.09 C 261.61 179.17 277.97 175.83 291.42 167.52 C 304.20 159.78 314.36 147.85 320.00 134.02 C 326.81 117.28 326.82 97.86 319.87 81.16 C 314.06 66.86 303.31 54.65 289.92 46.99 C 276.02 38.93 259.26 36.00 243.44 38.71 M 115.51 129.79 C 100.56 132.09 86.71 140.78 78.27 153.35 C 68.06 168.10 65.85 187.91 72.36 204.60 C 76.42 215.15 83.80 224.40 93.21 230.67 C 107.51 240.43 126.53 242.76 142.79 236.84 C 153.12 233.22 162.28 226.40 168.76 217.60 C 176.45 207.18 180.39 194.01 179.47 181.07 C 178.61 165.18 170.37 149.89 157.62 140.37 C 145.81 131.28 130.21 127.46 115.51 129.79 M 385.22 129.14 C 370.90 129.39 356.78 135.50 346.79 145.77 C 335.89 156.80 329.99 172.62 331.12 188.11 C 331.93 203.34 339.51 218.04 351.39 227.60 C 359.97 234.66 370.76 239.03 381.85 239.85 C 397.91 241.33 414.46 235.26 425.78 223.76 C 437.40 212.23 443.40 195.32 441.62 179.04 C 440.23 163.79 432.04 149.32 419.73 140.21 C 409.92 132.75 397.53 128.87 385.22 129.14 M 248.44 223.61 C 241.68 225.11 235.41 228.66 230.61 233.65 C 219.64 244.65 217.44 263.09 225.59 276.33 C 233.83 291.00 253.28 297.85 268.87 291.45 C 285.58 285.52 295.56 265.80 290.39 248.82 C 285.94 231.06 266.25 219.20 248.44 223.61 M 116.21 280.11 C 100.80 282.09 86.57 291.07 77.88 303.91 C 68.59 317.32 65.89 334.99 70.53 350.60 C 74.44 364.41 84.06 376.49 96.60 383.44 C 108.39 390.18 122.71 392.15 135.93 389.20 C 150.19 386.13 162.96 377.04 170.71 364.71 C 178.68 352.21 181.20 336.41 177.68 322.03 C 174.31 307.51 164.65 294.61 151.76 287.16 C 141.15 280.88 128.40 278.45 116.21 280.11 M 378.26 280.22 C 362.95 282.33 348.83 291.38 340.30 304.24 C 331.79 316.85 328.91 333.07 332.47 347.84 C 335.72 362.13 345.04 374.89 357.58 382.45 C 367.50 388.57 379.42 391.32 391.02 390.34 C 407.04 389.21 422.21 380.47 431.51 367.42 C 441.14 354.32 444.27 336.81 440.14 321.12 C 436.52 306.81 426.84 294.16 413.99 286.90 C 403.29 280.71 390.47 278.37 378.26 280.22 M 249.45 350.77 C 232.98 352.27 217.57 361.77 208.61 375.64 C 200.35 388.17 197.65 404.16 201.15 418.74 C 204.43 433.13 213.87 445.97 226.54 453.50 C 238.24 460.63 252.64 463.00 266.04 460.34 C 279.98 457.66 292.59 449.22 300.67 437.60 C 308.94 425.93 312.17 410.97 309.85 396.90 C 307.90 384.83 301.82 373.47 292.80 365.22 C 281.33 354.45 265.08 349.06 249.45 350.77 Z'
    />
    <path
      fill={fill}
      opacity='1.00'
      d=' M 248.23 48.26 C 263.05 46.51 278.50 50.55 290.48 59.47 C 302.39 68.18 310.90 81.45 313.69 95.95 C 316.53 110.31 314.01 125.75 306.36 138.27 C 298.07 152.19 283.90 162.54 268.03 165.89 C 255.15 168.77 241.31 167.26 229.41 161.52 C 215.65 155.00 204.57 143.00 199.24 128.73 C 193.51 113.79 194.22 96.56 201.09 82.11 C 209.55 63.66 228.07 50.44 248.23 48.26 M 245.39 67.55 C 234.70 70.08 225.19 77.14 219.64 86.62 C 213.04 97.65 212.09 111.84 217.17 123.64 C 223.85 140.23 242.26 150.89 259.98 148.51 C 272.80 147.08 284.63 139.15 290.93 127.92 C 297.35 116.88 298.04 102.77 292.86 91.11 C 288.55 81.08 280.04 72.94 269.81 69.11 C 262.08 66.11 253.45 65.67 245.39 67.55 Z'
    />
    <path
      fill={fill}
      opacity='1.00'
      d=' M 248.37 73.52 C 265.87 69.68 284.81 81.62 288.84 99.06 C 293.44 115.45 283.89 134.13 267.97 140.07 C 253.19 146.27 234.68 140.46 226.08 126.95 C 217.31 114.17 218.70 95.62 229.32 84.31 C 234.32 78.83 241.08 74.94 248.37 73.52 M 247.41 79.59 C 237.97 82.15 230.10 89.78 227.24 99.14 C 224.51 107.87 226.20 117.91 231.81 125.17 C 239.45 135.78 254.66 139.92 266.58 134.48 C 280.44 128.93 288.01 111.70 282.48 97.77 C 277.79 83.84 261.52 75.38 247.41 79.59 Z'
    />
    <path
      fill={fill}
      opacity='1.00'
      d=' M 249.48 83.68 C 263.61 79.88 279.08 91.40 279.71 105.94 C 281.03 119.38 269.47 132.24 255.97 132.36 C 242.64 133.19 230.30 121.36 230.44 108.04 C 230.10 96.78 238.56 86.19 249.48 83.68 Z'
    />
    <path
      fill={fill}
      opacity='1.00'
      d=' M 250.42 227.54 C 265.19 224.47 281.12 233.81 285.75 248.14 C 291.33 263.16 283.07 281.47 268.11 287.20 C 254.12 293.37 236.42 287.22 229.06 273.89 C 221.70 261.62 224.40 244.58 235.17 235.17 C 239.42 231.28 244.76 228.63 250.42 227.54 M 251.40 233.60 C 239.33 235.83 229.94 247.81 231.10 260.11 C 231.78 273.08 243.90 284.16 256.92 283.41 C 270.51 283.40 282.36 270.58 281.27 257.02 C 280.95 242.33 265.78 230.36 251.40 233.60 Z'
    />
  </svg>
);