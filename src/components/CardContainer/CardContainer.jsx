import { useState } from 'react';
import { useEffect } from 'react';
import Card from '../Card/Card';
import './CardContainer.css';

const giphyBaseUrl = 'https://api.giphy.com/v1/gifs/';

const imgIds = [
  { id: 'Xpc7s6YMm3JIIioiXd', title: 'John Wick' },
  { id: '1TlI7LlYXzeko', title: 'Leon' },
  { id: 'g3cOYozjt6J9u', title: 'Mathilda' },
  { id: 'bbTwRabJQNuvK', title: 'Norman' },
  { id: 'fZd7JstZGbKmc', title: 'Max' },
  { id: 'ot4GiknOIswWk', title: 'Robert' },
  { id: 'lOUzl0Nj7P7rS1Km2M', title: 'Tommy' },
  { id: '3o6fJaERrYkx0LVp0Q', title: 'Alfie' },
  { id: '3o752jvNx7aLBtdfdm', title: 'Luca' },
  { id: '3ov9kbr4DoEUCJAWOc', title: 'Frank' },
  { id: '11jkrpPYTQkaU8', title: 'Saul' },
  { id: 'xThuWkk3lUGuoxsdpe', title: 'Mike' },
];

const apiKey = 'AlOXEY7Wby6RgIc6Kn5gqj3DVOjSp57B';

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

const CardContainer = ({ addScore, resetScore }) => {
  const [imgData, setImgData] = useState([]);

  const imgDataObj = {};

  const handleCardOnClick = id => {
    let index = -1;
    const img = imgData.find((item, i) => {
      if (item.id === id) {
        index = i;
        return item;
      }
    });
    const tempImgData = [...imgData];

    if (img.clicked) {
      resetScore();
      resetImgData();
      return;
    }

    tempImgData[index].clicked = true;
    addScore();
    setImgData([...tempImgData]);
  };

  const resetImgData = () => {
    const tempImgData = [...imgData];
    tempImgData.forEach(item => (item.clicked = false));
    setImgData([...tempImgData]);
  };

  const shuffleArr = arr => {
    const tempArr = [...arr];
    for (let i = tempArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = tempArr[i];
      tempArr[i] = tempArr[j];
      tempArr[j] = temp;
    }
    return tempArr;
  };

  shuffleArr(imgData).forEach(item => (imgDataObj[item.id] = item));

  useEffect(() => {
    let colorArr = [...colorPatten];

    const randomColor = () => {
      const randomNum = Math.floor(Math.random() * colorArr.length);
      const color = colorArr.splice(randomNum, 1);

      if (colorArr.length === 0) colorArr = [...colorPatten];

      return color;
    };

    Promise.all(
      imgIds.map(async item => ({
        id: item.id,
        url: await getImg(item.id),
        title: item.title,
        color: randomColor(),
        clicked: false,
      }))
    ).then(res => {
      setImgData([...res]);
    });
  }, []);

  return (
    <div className='card-container'>
      {Object.values(imgDataObj).map(item => (
        <Card
          id={item.id}
          url={item.url}
          key={item.id}
          title={item.title}
          color={item.color}
          onClick={handleCardOnClick}
        />
      ))}
    </div>
  );
};

export default CardContainer;
