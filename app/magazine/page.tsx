import Footer from '../components/Footer';
import BlogArea from './components/BlogArea';
import styles from './page.module.scss';

export default function page() {
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.logoArea}>
            <h1 className={styles.h1}>The: </h1>
            <div className={styles.animation}>
              <h1 className={styles.h1}>
                Community Community Community Community
              </h1>
            </div>
          </div>
          <div className={styles.secondaryContainer}>
            <div className={styles.footer}>
              {' '}
              <Footer
                customFooter="customFooterMagazine"
                customColor={'#000000'}
              />
            </div>
          </div>
        </div>
        <div className={styles.blogAreaWrapper}>
          <BlogArea />
        </div>
      </div>
    </div>
  );
}
