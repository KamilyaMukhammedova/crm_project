// import React, { FC } from 'react';
// import { useNavigate } from "react-router-dom";
// import logo from "../../../assets/logo.svg";
// import logoMini from "../../../assets/logo_mini.svg";
// import styles from './Logo.module.scss';
//
// interface IProps {
//     isMini: boolean
// }
//
// const Logo: FC<IProps> = ({isMini}) => {
//     const navigate = useNavigate();
//
//
//     const onLogo = () => {
//         const languageFromUrl = new URLSearchParams(window.location.search).get('lang') || 'en';
//         navigate('/?lang=' + languageFromUrl);
//     };
//
//     return (
//         <div
//             className={styles.logoWrapper}
//             onClick={onLogo}
//         >
//             <div>
//                 <img src={!isMini ? logo : logoMini} alt="Indenim logo"/>
//             </div>
//             <span>CRM</span>
//         </div>
//     );
// };
//
// export default Logo;

import React, { FC } from 'react';
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import logoMini from "../../../assets/logo_mini.svg";
import styles from './Logo.module.scss';

interface IProps {
    isMini: boolean,
    width?: number,
}

const Logo: FC<IProps> = ({isMini, width}) => {
    const navigate = useNavigate();


    const onLogo = () => {
        const languageFromUrl = new URLSearchParams(window.location.search).get('lang') || 'en';
        navigate('/?lang=' + languageFromUrl);
    };

    return (
        <div
            className={styles.logoWrapper}
            style={{width: `${width}%` || '100%'}}
            onClick={onLogo}
        >
            <span>CRM</span>
        </div>
    );
};

export default Logo;