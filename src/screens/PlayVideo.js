import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
var videos = [
  {
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    poster: 'https://www.carage.net/media/halfhd/carage_fahrzeuge_square_8.jpg',
    title: 'Video 1',
  },
  {
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    poster:
      'https://carsguide-res.cloudinary.com/image/upload/f_auto%2Cfl_lossy%2Cq_auto%2Ct_default/v1/editorial/story/hero_image/1908-Ford-Model-T_0.jpg',
    title: 'Video 2',
  },
  {
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    poster:
      'https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/surfing-dog-photo-is-funner-or-funnest-a-real-word-5670-6d512231d0a52079b0c9fbf474f9a6c9@1x.jpg',
    title: 'Video 3',
  },
  {
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    poster:
      'https://wikiimg.tojsiabtv.com/wikipedia/en/6/6f/War_official_poster.jpg',
    title: 'Video 4',
  },
  {
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    poster:
      'https://www.alsharqtoday.com/wp-content/uploads/2020/09/%D8%A7%D9%84%D8%AC%D9%84%D9%8A%D8%AF.jpg',
    title: 'Video 5',
  },
  {
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://pbs.twimg.com/media/FDX7UCbVcAUcNXj.jpg',
    title: 'Video 6',
  },
];

const PlayVideo = props => {
  const [fullScreen, setFullScreen] = useState(false);
  const IsFocused = useIsFocused();
  const navigation = useNavigation();

  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const timer =
      counter > 0
        ? setInterval(() => setCounter(counter - 1), 1000)
        : setshowController(false);
    return () => clearInterval(timer);
  }, [counter]);

  const [showController, setshowController] = useState(true);

  const [paused, setpaused] = useState(false);
  const [muted, setmuted] = useState(false);
  const [volume, setvolume] = useState(1);
  const [CurrentTime, setCurrentTime] = useState(0);
  const [Duration, setDuration] = useState(0);
  const [sakeValue, setsakeValue] = useState(0);
  const [videoIndexNum, setVideoIndexNum] = useState(0);

  const toggleController = () => {
    setCounter(3);
    setshowController(!showController);
  };

  const ValidTime = time => {
    var sec_num = parseInt(time); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
  };

  const FullScreen = () => {
    if (fullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setFullScreen(!fullScreen);
  };
  useEffect(() => {
    if (IsFocused) {
      Orientation.lockToLandscape();
      setFullScreen(true);
    } else {
      Orientation.lockToPortrait();
      setFullScreen(false);
    }
  }, [IsFocused]);

  const Controller = (
    <View
      style={{
        //   backgroundColor: 'white',
        position: 'absolute',
        zIndex: 9999,
        height: '100%',
        width: '100%',
        justifyContent: 'space-between',
        paddingTop: 10,
      }}>
      {/* Top View */}
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '95%',
        }}>
        <Icon
          name="arrow-back-outline"
          type="ionicon"
          size={30}
          onPress={() => navigation.goBack()}
          color={'#fff'}
          activeOpacity={1}
        />
        <Icon
          name="expand"
          type="ionicon"
          size={30}
          onPress={() => FullScreen()}
          color={'#fff'}
          activeOpacity={1}
        />
      </View>

      {/* Center View */}
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '50%',
        }}>
        <Icon
          name="play-back-outline"
          type="ionicon"
          size={40}
          color={'#fff'}
          onPress={() => setsakeValue(CurrentTime - 5)}
          activeOpacity={1}
        />
        <View
          style={{
            backgroundColor: 'rgba(52, 52, 52, .8)',
            borderRadius: 100,
            padding: 8,
          }}>
          {paused ? (
            <Icon
              name="play-outline"
              type="ionicon"
              size={40}
              onPress={() => setpaused(false)}
              color={'#fff'}
              activeOpacity={1}
              underlayColor={'rgba(52, 52, 52, 0)'}
            />
          ) : (
            <Icon
              name="pause-outline"
              type="ionicon"
              size={40}
              color={'#fff'}
              onPress={() => setpaused(true)}
              activeOpacity={1}
              underlayColor={'rgba(52, 52, 52, 0)'}
            />
          )}
        </View>
        <Icon
          name="play-forward-outline"
          type="ionicon"
          size={40}
          color={'#fff'}
          onPress={() => setsakeValue(CurrentTime + 5)}
          activeOpacity={1}
        />
      </View>

      {/* Bottom View */}
      <View style={{height: '20%', justifyContent: 'flex-end'}}>
        <Text
          style={{
            color: '#fff',
          }}>
          {ValidTime(CurrentTime)}/{ValidTime(Duration)}
        </Text>
        <View
          style={{
            height: 8,
            width: '100%',
            backgroundColor: 'grey',
          }}>
          {Duration > 0 ? (
            <View
              style={{
                height: '100%',
                width: `${(CurrentTime / Duration) * 100}%`,
                backgroundColor: 'green',
              }}
            />
          ) : null}
        </View>
      </View>
    </View>
  );

  return (
    <>
      <TouchableOpacity
        style={[
          {
            backgroundColor: 'black',
          },
          fullScreen
            ? {
                height: '100%',
                width: '100%',
              }
            : {
                height: 250,
                width: '100%',
              },
        ]}
        activeOpacity={1}
        onPress={toggleController}>
        <Video
          // source={require('../mp4/ForBiggerJoyrides.mp4')}
          source={{
            uri: videos[videoIndexNum].url,
          }}
          poster={videos[videoIndexNum].poster}
          //   source={{
          //     uri: props.route.params.selectedVideo.url,
          //   }}
          //   poster={props.route.params.selectedVideo.poster}
          style={{
            height: '100%',
            width: '100%',
          }}
          resizeMode="contain"
          paused={paused}
          muted={muted}
          volume={volume}
          fullscreen={fullScreen}
          seek={sakeValue}
          //   onEnd={() => navigation.goBack()}
          onEnd={() => setVideoIndexNum(videoIndexNum + 1)}
          onSeek={e => {
            setCurrentTime(e.currentTime);
          }}
          onLoad={e => {
            setDuration(e.duration);
          }}
          onProgress={e => {
            console.log('pro', e);
            setCurrentTime(e.currentTime);
          }}
        />
        {showController ? Controller : null}
      </TouchableOpacity>
      {fullScreen ? null : (
        <>
          <View
            style={{
              paddingTop: 20,
              paddingBottom: 30,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                marginLeft: 10,
                fontWeight: '600',
              }}>
              {videos[videoIndexNum].title}
            </Text>
          </View>
          {videos.map((item, ind) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: videoIndexNum == ind ? 'grey' : '#fff',
                  margin: 5,
                  borderRadius: 10,
                }}
                key={ind}
                onPress={() => {
                  setVideoIndexNum(ind);
                  setpaused(false);
                }}>
                <Image
                  source={{uri: item.poster}}
                  style={{
                    height: 50,
                    width: 50,
                    margin: 5,
                    borderRadius: 10,
                  }}
                />
                <Text
                  style={{
                    color: '#000',
                    fontSize: 20,
                    marginLeft: 10,
                    fontWeight: '600',
                  }}>
                  {item.title}
                </Text>
                <View
                  style={{
                    marginLeft: 'auto',
                  }}
                />
                {videoIndexNum == ind && !paused ? (
                  <Icon
                    name="pause-outline"
                    type="ionicon"
                    style={{
                      marginRight: 20,
                    }}
                  />
                ) : (
                  <Icon
                    name="play-outline"
                    type="ionicon"
                    style={{
                      marginRight: 20,
                    }}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </>
      )}
    </>
  );
};

export default PlayVideo;
