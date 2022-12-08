import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Spinner from './components/Spinner';
import Welcome from './components/Welcome';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/toast.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050';

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSavedImages() {
      try {
        const res = await axios.get(`${API_URL}/images`);
        setImages(res.data || []);
        if (res.data.length !== 0) {
          toast.success('Saved images downloaded');
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
    getSavedImages();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{ ...res.data, title: word }, ...images]);
      toast.info(`New image ${word.toUpperCase()} was found`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setWord('');
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved.saved = true;

    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved);
      if (res.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image
          )
        );
        toast.info(`Image ${imageToBeSaved.title.toUpperCase()} was saved`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      if (!images.find((image) => image.id === id).saved) {
        setImages(images.filter((image) => image.id !== id));
        toast.warn(
          `Image ${images
            .find((i) => i.id === id)
            .title.toUpperCase()} was removed from dashboard`
        );
      } else {
        const res = await axios.delete(`${API_URL}/images/${id}`);
        if (res.data?.deleted_id) {
          setImages(images.filter((image) => image.id !== id));
          toast.warn(
            `Image ${images
              .find((i) => i.id === id)
              .title.toUpperCase()} was deleted`
          );
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Header title="Images Gallery" />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Search
            word={word}
            setWord={setWord}
            handleSubmit={handleSearchSubmit}
          />
          <Container className="mt-4">
            {images.length ? (
              <Row xs={1} md={2} lg={3}>
                {images.map((image, i) => (
                  <Col key={i} className="pb-3">
                    <ImageCard
                      image={image}
                      deleteImage={handleDeleteImage}
                      saveImage={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Welcome />
            )}
          </Container>
        </>
      )}
      <ToastContainer
        position="bottom-right"
        newestOnTop={true}
        theme="colored"
      />
    </div>
  );
};

export default App;
