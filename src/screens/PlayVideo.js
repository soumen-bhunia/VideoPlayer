import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import Slider from '@react-native-community/slider';
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
  const [showLoader, setshowLoader] = useState(false);

  const [paused, setpaused] = useState(true);
  const [muted, setmuted] = useState(false);
  const [volume, setvolume] = useState(1);
  const [CurrentTime, setCurrentTime] = useState(0);
  const [Duration, setDuration] = useState(0);
  const [sakeValue, setsakeValue] = useState(0);
  const [videoIndexNum, setVideoIndexNum] = useState(0);
  let ScalValue = fullScreen ? 1 : 0.7;

  const toggleController = () => {
    setCounter(5);
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
      // Orientation.lockToLandscape();
      // setFullScreen(true);
    } else {
      Orientation.lockToPortrait();
      setFullScreen(false);
    }
  }, [IsFocused]);
  useEffect(() => {
    if (!paused) {
      Orientation.lockToLandscape();
      setFullScreen(true);
    }
  }, [paused]);

  const Controller = (
    <View
      style={{
        position: 'absolute',
        zIndex: 9999,
        height: '100%',
        width: '100%',
        justifyContent: 'space-between',
      }}>
      {/* Top View */}
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '95%',
          height: 70,
        }}
        activeOpacity={1}>
        <Icon
          name="arrow-back-outline"
          type="ionicon"
          size={40 * ScalValue}
          onPress={() => navigation.goBack()}
          color={'#fff'}
          activeOpacity={1}
        />
      </TouchableOpacity>

      {/* Center View */}
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '80%',
        }}
        activeOpacity={1}>
        <Icon
          name="play-skip-back-outline"
          type="ionicon"
          size={40 * ScalValue}
          color={'#fff'}
          onPress={() =>
            videos.length > 0 && videoIndexNum > 0
              ? setVideoIndexNum(videoIndexNum - 1)
              : null
          }
          activeOpacity={1}
        />
        <Icon
          name="play-back-outline"
          type="ionicon"
          size={40 * ScalValue}
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
              size={40 * ScalValue}
              onPress={() => setpaused(false)}
              color={'#fff'}
              activeOpacity={1}
              underlayColor={'rgba(52, 52, 52, 0)'}
            />
          ) : (
            <Icon
              name="pause-outline"
              type="ionicon"
              size={40 * ScalValue}
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
          size={40 * ScalValue}
          color={'#fff'}
          onPress={() => setsakeValue(CurrentTime + 5)}
          activeOpacity={1}
        />
        <Icon
          name="play-skip-forward-outline"
          type="ionicon"
          size={40 * ScalValue}
          color={'#fff'}
          onPress={() =>
            videos.length > videoIndexNum + 1
              ? setVideoIndexNum(videoIndexNum + 1)
              : null
          }
          activeOpacity={1}
        />
      </TouchableOpacity>

      {/* Bottom View */}
      <TouchableOpacity
        style={{
          width: '95%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'center',
          height: 70,
        }}
        activeOpacity={1}>
        <Text
          style={{
            color: '#fff',
          }}>
          {ValidTime(CurrentTime)}
        </Text>

        <Slider
          style={{height: 50, flex: 1}}
          minimumValue={0}
          maximumValue={Duration}
          minimumTrackTintColor="#1505f7"
          maximumTrackTintColor="#1505f7"
          onSlidingComplete={e => {
            setCounter(5);
            setsakeValue(e);
          }}
          value={CurrentTime}
        />
        <Text
          style={{
            color: '#fff',
          }}>
          {ValidTime(Duration)}
        </Text>
        <View
          style={{
            width: `${15 / ScalValue}%`,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          {muted ? (
            <Icon
              type="ionicon"
              name="volume-mute-outline"
              size={35 * ScalValue}
              color={'#fff'}
              onPress={() => setmuted(false)}
            />
          ) : (
            <Icon
              type="ionicon"
              name="volume-high-outline"
              size={35 * ScalValue}
              color={'#fff'}
              onPress={() => setmuted(true)}
            />
          )}
          <Icon
            name="expand"
            type="ionicon"
            size={40 * ScalValue}
            onPress={() => FullScreen()}
            color={'#fff'}
            activeOpacity={1}
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  const Loader = (
    <View
      style={{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}>
      <ActivityIndicator
        size={40 * ScalValue}
        color={'white'}
        style={{
          backgroundColor: 'rgba(52, 52, 52, 0.8)',
          padding: 10,
          borderRadius: 100,
        }}
      />
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
          // source={{
          //   uri: props.route.params.selectedVideo.url,
          // }}
          //   poster={props.route.params.selectedVideo.poster}
          style={{
            height: '100%',
            width: '100%',
          }}
          selectedVideoTrack={{
            type: 'resolution',
            value: 240,
          }}
          posterResizeMode="cover"
          resizeMode="contain"
          paused={paused}
          muted={muted}
          volume={volume}
          fullscreen={fullScreen}
          seek={sakeValue}
          onEnd={() => {
            videos.length > videoIndexNum + 1
              ? setVideoIndexNum(videoIndexNum + 1)
              : (Orientation.lockToPortrait(),
                setFullScreen(false),
                setpaused(true));
          }}
          onSeek={e => {
            setCurrentTime(e.currentTime);
          }}
          onLoadStart={() => {
            setshowLoader(true);
          }}
          onLoad={e => {
            console.log('load', e);
            setDuration(e.duration);
            setshowLoader(false);
          }}
          onBuffer={({isBuffering}) => {
            console.log('Buffring', e);
            if (isBuffering) {
              setshowLoader(true);
            } else {
              setshowLoader(false);
            }
          }}
          bufferConfig={{
            minBufferMs: 1500,
            maxBufferMs: 50,
            bufferForPlaybackMs: 250,
            bufferForPlaybackAfterRebufferMs: 500,
          }}
          onProgress={e => {
            // console.log('pro', e);
            setCurrentTime(e.currentTime);
          }}
        />
        {showController
          ? showLoader
            ? Loader
            : Controller
          : showLoader
          ? Loader
          : null}
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
