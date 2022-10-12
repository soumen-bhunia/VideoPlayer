import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

const VideoList = () => {
  const navigation = useNavigation();
  var videos = [
    {
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
      poster:
        'https://www.carage.net/media/halfhd/carage_fahrzeuge_square_8.jpg',
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
  return (
    <View>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGxlYXJufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        }}
        style={{
          height: 250,
          width: '100%',
        }}
      />
      <View
        style={{
          height: 10,
        }}
      />
      {videos.map((item, ind) => {
        return (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              margin: 5,
              borderRadius: 10,
            }}
            key={ind}
            onPress={() =>
              navigation.navigate('playVideo', {
                selectedVideo: item,
              })
            }>
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
            <Icon
              name="play-outline"
              type="ionicon"
              style={{
                marginRight: 20,
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default VideoList;
