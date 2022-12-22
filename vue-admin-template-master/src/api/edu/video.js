import request from '@/utils/request'

export default {

  //1添加小节
  addVideo(eduVideo){
    return request({
      url: '/eduService/eduVideo/addVideo',
      method: 'post',
      data:eduVideo,
    })
  },
  //3根据小节id查询
  getVideo(videoId){
    return request({
      url: '/eduService/eduVideo/getVideoInfo/'+videoId,
      method: 'get',
    })
  },

  //4修改小节
  updateVideo(eduVideo){
    return request({
      url: '/eduService/eduVideo/updateVideo',
      method: 'post',
      data:eduVideo,
    })
  },

  //5删除小节
  deleteVideo(videoId){
    return request({
      url: '/eduService/eduVideo/'+videoId,
      method: 'delete',
    })
  },
  //5删除阿里云视频
  deleteAlyVod(id){
    return request({
      url: '/eduVod/video/removeAlyVideo/'+id,
      method: 'delete',
    })
  },

}
