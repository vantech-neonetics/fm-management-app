```js
// Import React, { useEffect, useState } from 'react';
// Import { Header, Segment } from 'semantic-ui-react';
// Import { API, showError } from '../../helpers';
// Import { marked } from 'marked';

const About = () => {
  const [about, setAbout] = useState('');
  const [aboutLoaded, setAboutLoaded] = useState(false);

  const displayAbout = async () => {
    setAbout(localStorage.getItem('about') || '');
    const res = await API.get('/api/about');
    const { success, message, data } = res.data;
    if (success) {
      let aboutContent = data;
      if (!data.startsWith('https://')) {
        aboutContent = marked.parse(data);
      }
      setAbout(aboutContent);
      localStorage.setItem('about', aboutContent);
    } else {
      showError(message);
      setAbout('Loading about content failed...');
    }
    setAboutLoaded(true);
  };

  useEffect(() => {
    displayAbout().then();
  }, []);

  return (
    <>
      {
        aboutLoaded && about === '' ? <>
          <Segment>
            <Header as='h3'>About</Header>
            <p>You can set the about content on the settings page, supports HTML & Markdown</p>
            Repository link:
            <a href='https://github.com/songquanpeng/one-api'>
              https://github.com/songquanpeng/one-api
            </a>
          </Segment>
        </> : <>
          {
            about.startsWith('https://') ? <iframe
              src={about}
              style={{ width: '100%', height: '100vh', border: 'none' }}
            /> : <div style={{ fontSize: 'larger' }} dangerouslySetInnerHTML={{ __html: about }}></div>
          }
        </>
      }
    </>
  );
};


export default About;
```