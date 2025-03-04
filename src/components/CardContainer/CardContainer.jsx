import { useState } from 'react';
import { useEffect } from 'react';
import Card from '../Card/Card';
import './CardContainer.css'

const giphyBaseUrl = 'https://api.giphy.com/v1/gifs/';

const imageIds = {
  john_wick: { id: 'Xpc7s6YMm3JIIioiXd', title: 'John Wick' },
  leon: { id: '1TlI7LlYXzeko', title: 'Leon' },
  mathilda: { id: 'g3cOYozjt6J9u', title: 'Mathilda' },
  norman: { id: 'bbTwRabJQNuvK', title: 'Norman' },
  max: { id: 'fZd7JstZGbKmc', title: 'Max' },
  robert: { id: 'ot4GiknOIswWk', title: 'Robert' },
  tommy: { id: 'lOUzl0Nj7P7rS1Km2M', title: 'Tommy' },
  alfie: { id: '3o6fJaERrYkx0LVp0Q', title: 'Alfie' },
  luca: { id: '3o752jvNx7aLBtdfdm', title: 'Luca' },
  frank: { id: '3ov9kbr4DoEUCJAWOc', title: 'Frank' },
  saul: { id: '11jkrpPYTQkaU8', title: 'Saul' },
  mike: { id: 'xThuWkk3lUGuoxsdpe', title: 'Mike' },
};

const apiKey = 'ZVV4MaUkogXKypgbrJ5D2j2DuVWtswTp';

const getImg = async id => {
  return fetch(`${giphyBaseUrl}${id}?api_key=${apiKey}`)
    .then(res => res.json())
    .then(result => result.data.images.fixed_width.webp)
    .catch(err => console.log('Error:', err));
};

const colorPatten = [
  '#4F939B',
  '#706C4C',
  '#704C60',
  '#3939AA',
  '#4F8040',
  '#805540',
];

let init = true;

const CardContainer = () => {
  const [imagesUrl, setImageUrl] = useState([]);

  useEffect(() => {
    if (!init) {
      let colorArr = [...colorPatten];

      const randomColor = () => {
        const randomNum = Math.floor(Math.random() * colorArr.length);
        const color = colorArr.splice(randomNum, 1);

        if (colorArr.length === 0) colorArr = [...colorPatten];

        return color;
      };

      const setData = async () => {
        let tempImagesUrl = [];
        for (const prop in imageIds) {
          tempImagesUrl.push({
            url: await getImg(imageIds[prop].id),
            title: imageIds[prop].title,
            color: randomColor(),
          });
        }
        setImageUrl([...tempImagesUrl]);
      };

      setData();
    }
    if (init) init = false;
  }, []);

  return (
    <div className='card-container'>
      {imagesUrl.map(item => (
        <Card
          url={item.url}
          key={item.url}
          title={item.title}
          color={item.color}
        />
      ))}
    </div>
  );
};

export default CardContainer;
