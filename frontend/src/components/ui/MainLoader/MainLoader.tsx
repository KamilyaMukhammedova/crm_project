import React, { FC } from 'react';
import styles from "./MainLoader.module.scss";

const MainLoader: FC = () => {
    return (
        <div className={styles.wrapper}>
            <span className={styles.loader}/>
        </div>
    )
};

export default MainLoader;