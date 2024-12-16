import React, { useState } from 'react';
import Search from './Search';
import Heading from './Heading';
import img1 from './Images/icons8-fiverr-50.png';
import img2 from './Images/icons8-linkedin-50.png';
export default function Displaydev() {
  const [mode, setMode] = useState('light');
  const [user, setUser] = useState('');
  const [data, setData] = useState(null);
  const [showInfo, setShowInfo] = useState('none');
  const [error, setError] = useState(false);
  const changeMode = () => {
    console.log('clicked');
    let element = document.querySelector('.App');
    if (mode === 'light') {
      element.classList.add('dark');
      document.body.style.backgroundColor = '#1d242e';
      setMode('dark');
    } else {
      element.classList.remove('dark');
      document.body.style.backgroundColor = '#f0f8ff';
      setMode('light');
    }
  };

  const onChangeHandler = (e) => {
    setUser(e.target.value);
    setError(false); 
  };

  const searchUser = async () => {
    try {
      setShowInfo('block');
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) {
        if (response.status === 404) {
          setError(true);
          setData(null);
        }
        return;
      }
      const result = await response.json();
      setData(result);
      setError(false);
    } catch (e) {
      console.log('Error fetching user data');
      setError(true);
      setData(null);
    }
  };

  const formatGithubDate = (gitDate) => {
    let date = new Date(gitDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={`App container ${mode}`}>
      <div className="part1">
        <Heading changeMode={changeMode} mode ={mode} heading = 'GitLens Viewer'/>
      </div>
      <div className="part2">
        <Search onChangeHandler={onChangeHandler} user={user} searchUser={searchUser} />
      </div>
      <div className="part3" style={{ display: showInfo, transition: 'transform 0.3s ease, bottom 0.5s ease' }}>
        {error ? (
          <div className="part3-item" style={{ transform: 'translateY(2vh)', textAlign: 'center', color: 'red' }}>
            <p>Developer not found!</p>
          </div>
        ) : data ? (
          <div className="part3-item" style={{ transform: 'translateY(2vh)' }}>
            <div className="profile">
              <img src={data.avatar_url} alt="Profile" />
            </div>
            <div className="userinfo">
              <p className="username">{data.name}</p>
              <p className="joiningDate">{`Joined: ${formatGithubDate(data.created_at)}`}</p>
              <p className="updatedDate">{`Updated: ${formatGithubDate(data.updated_at)}`}</p>
              <p className="bio">{data.bio}</p>
            </div>
            <div className="gitInfo">
              <div className="Repo">
                <p>Repository</p>
                <p>{data.public_repos}</p>
              </div>
              <div className="Follower">
                <p>Follower</p>
                <p>{data.followers}</p>
              </div>
              <div className="Following">
                <p>Following</p>
                <p>{data.following}</p>
              </div>
            </div>
            <div className="socialInfo">
            <p> <span>{data.location}</span></p>
                <a href={data.html_url} className='btn' target="_blank" rel="noreferrer">Dive Into Profile</a>
              {/* <p><img className='img1' src={img1} alt="Not Found" /><a href={data.blog} target='_blank'>LinkedIn</a></p> */}
              {/* <p><img className='img2' src={img2} alt="Not Found" /><a href='www.fiverr.com'>Fiverr</a></p> */}
              
            </div>
            
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
