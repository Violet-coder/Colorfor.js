function useColorfor() {
var myColorforInstance = new Colorfor({
    elementClass: '.colorfor',
    states : {
        "color": {
            theme:'Orange',
            type: 'vivid',
            gradients: {
                direction: 'to top right'
            },
            animation:{
                time: 40,         
            },
            gradientPic:{
                blendingMode:"overlay"
            },
            selection:{
                selectionColor:"accent"
            },
            colorforDecoration:{
                shape: "star"
            },

        }
    }
    });
}
useColorfor();
