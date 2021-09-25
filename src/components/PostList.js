import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Link } from '@react-navigation/native';
import User from '../data/user';
import CONFIG from '../global/config';
import DateHelper from '../utils/date-helper';

const ButtonLike = ({ post, user, onUpdate }) => {
  const onPress = async () => {
      try {
        if (post.likes.includes(user.id)) await User.dislikePost(post.id);
        else await User.likePost(post.id);
        
        await onUpdate();
      } catch (error) {
          alert(error.message);
      }
  };

  return (
      <View>
          <TouchableOpacity onPress={onPress}>
              {
                  post.likes.includes(user.id) ?
                  <FontAwesome5
                      name='thumbs-up'
                      solid
                      size={23}
                      color='blue'
                  /> :
                  <FontAwesome5
                      name='thumbs-up'
                      size={23}
                      color='gray'
                  />
              }
          </TouchableOpacity>
      </View>
  );
};

const ButtonComment = ({ navigation, postId, postData }) => {
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('detailPost', { id: postId, postData })
    }}>
        <FontAwesome5
            name='comment'
            size={25}
            color='gray'
        />
    </TouchableOpacity>
      
  );
};

const ButtonViews = () => {
  return (
      <View>
          <TouchableOpacity>
              <FontAwesome5
                  name='eye'
                  size={25}
                  color='gray'
              />
          </TouchableOpacity>
      </View>
  );
};

const PostDate = ({ postDate }) => {
  const { year, month, date } = DateHelper.parse(postDate);

  return (
      <Text style={{ fontSize: 18, marginTop: 10 }}>{date} {month} {year}</Text>
  )
}

const PostItem = ({ post, user, onUpdate, navigation }) => (
  <TouchableOpacity 
      key={post.id} 
      onPress={() => navigation.navigate('detailPost', { postId: post.id, postData: post })}
  >
      <View style={styles.container1}>
          <TouchableOpacity
              style={{ flexDirection: 'row', marginTop: 15, marginLeft: 15 }}
              onPress={() => {
                navigation.navigate('ProfilePage', { userId: post.user_id });
              }}>
              <Image
                  source={{
                      uri: `${CONFIG.IMAGE_PATH.USER}/${post.user_image}`
                  }}
                  style={styles.UserProfile}
              />
              <Text style={styles.UserName}>{post.username}</Text>
          </TouchableOpacity>

          <View>
              <Image
                  source={{
                      uri: `${CONFIG.IMAGE_PATH.POST}/${post.image}`
                  }}
                  style={styles.UserPost}
              />
          </View>


          <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 15, alignItems: 'center' }}>
              <View>
                  <ButtonLike post={post} user={user} onUpdate={onUpdate} />
              </View>
              <View>
                  <Text style={{ marginLeft: 5 }}>{post.likes.length}</Text>
              </View>
              <View style={{ marginLeft: 15 }}>
                  <ButtonComment postId={post.id} postData={post} navigation={navigation} />
              </View>
              <View>
                  <Text style={{ marginLeft: 5 }}>{post.comments.length}</Text>
              </View>
              <View style={{ marginLeft: 15 }}>
                  <ButtonViews />
              </View>
              <View>
                  <Text style={{ marginLeft: 5 }}>{post.insight}</Text>
              </View>
          </View>

          <View>
              <Text style={{ fontSize: 18, marginLeft: 15, marginTop: 10 }}>{post.title}</Text>
          </View>

          <View style={styles.dateBox}>
              <View>
                  <PostDate postDate={post.date} />
              </View>
          </View>
      </View>
  </TouchableOpacity>
);

const EmptyPostItem = () => (
  <View style={{ marginVertical: 255, width: 250, alignSelf: 'center' }}>
      <FontAwesome5
          name='smile-wink'
          size={30}
          color='gray'
          style={{ alignSelf: 'center' }}
      />
      <Text style={{ fontSize: 20, textAlign: 'center', textAlignVertical: 'center' }}>Belum ada desain untuk saat ini</Text>
  </View>
);

const PostList = (({ navigation, posts, user, onUpdateList }) => (
  <>
      {posts.length < 1 && <EmptyPostItem />}

      {posts.map((post) => (
          <PostItem 
              key={post.id}
              navigation={navigation}
              post={post} 
              user={user} 
              onUpdate={onUpdateList}
          />
      ))}
  </>
));

const styles = StyleSheet.create({
  container1: {
      borderColor: '#000',
      backgroundColor: '#fff',
      borderWidth: 1,
      alignSelf: 'center',
      alignContent: 'center',
      width: 360,
      height: 410,
      marginTop: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 10
  },
  container2: {
      borderColor: '#000',
      backgroundColor: '#fff',
      borderWidth: 1,
      alignSelf: 'center',
      alignContent: 'center',
      width: 360,
      height: 410,
      marginTop: 30,
      marginBottom: 50,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 10
  },
  UserProfile: {
      width: 40,
      height: 40,
      borderRadius: 50
  },
  UserName: {
      color: '#000',
      fontSize: 15,
      marginTop: 10,
      marginLeft: 10,
  },
  UserPost: {
      width: 360,
      height: 215,
      marginTop: 15
  },
  dateBox: {
      alignSelf: 'center',
      alignItems: 'center',
      width: 360,
      height: 45,
      backgroundColor: '#cacaca',
      borderColor: '#000',
      borderWidth: 1,
      marginTop: 10
  },
});

export default PostList;
