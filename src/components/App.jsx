import styles from './App.module.css';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Button } from './Button';
import { fetchImages } from 'services/images-api';
import { Modal } from './Modal';
import { applyDarkTheme } from 'components/Themes/theme-switcher';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [queryResult, setQueryResult] = useState([]);
  const [totalQueryResult, setTotalQueryResult] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    setLoading(true);
    fetchImages(currentPage, searchQuery)
      .then(images => {
        if (images.hits.length === 0) {
          toast.info('No images found for this query');
          setQueryResult([]);
          setCurrentPage(1);
        }

        setQueryResult(prevState => [...prevState, ...images.hits]);
        setTotalQueryResult(images.totalHits);
      })
      .catch(response => {
        console.log(response);
      })
      .finally(() => setLoading(false));
  }, [searchQuery, currentPage]);

  function handleFormSubmit(searchQuery) {
    setSearchQuery(searchQuery);
    setQueryResult([]);
    setCurrentPage(1);
  }

  function incrementPage() {
    setCurrentPage(prevState => prevState + 1);
  }

  function toggleModal() {
    setIsModalOpen(prevState => !prevState);
    document.body.style.overflow = isModalOpen ? 'auto' : 'hidden';
  }

  function enlargeImage(clickedImage) {
    toggleModal();
    setModalImage(clickedImage);
  }

  function toggleTheme() {
    setIsDarkTheme(prevState => !prevState);
    applyDarkTheme(isDarkTheme);
  }

  return (
    <div className={styles.App}>
      <ToastContainer autoClose={3000} />
      <Searchbar onSubmit={handleFormSubmit} changeTheme={toggleTheme} />
      {queryResult && (
        <ImageGallery images={queryResult} openModal={enlargeImage} />
      )}
      {isModalOpen && (
        <Modal
          largeImageURL={modalImage}
          onClose={toggleModal}
          description={searchQuery}
        />
      )}
      {loading && <Loader />}
      {queryResult.length > 11 &&
        queryResult.length !== totalQueryResult &&
        !loading && <Button onClick={incrementPage} />}
    </div>
  );
}
