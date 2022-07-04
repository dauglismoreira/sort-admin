import { Component } from 'react';

class ImoveisImages extends Component {

  state = {
    images: []
  };

  loadImages = async () => {
    const imagesResponse = fetch(`https://sort.vps-kinghost.net/api/immobile/select/media/${this.props.id}`);
    const [images] = await Promise.all([imagesResponse]);
    const imagesJson = await images.json();
    this.setState({ images: imagesJson });
  }

  componentDidMount() {
    this.loadImages();
  }



  render() {

    const { images } = this.state;

    return (
      <>
        {images.filter(images => images.position === 1).map((image, i) => (
          < div key={i} className="picture" style={
            {
              backgroundImage: ` url(${image.url})`
            }}>
          </div>
        ))}
      </ >)
  }

  componentWillUnmount() {
    clearInterval(this.state);
  }
}

export default ImoveisImages;