// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        cue:{
            type:cc.Node,
            default:null,
        },
        min_dis:20, //如果拖动的距离到白球的中心<min_dis,那么就隐藏球杆，否则显示球杆
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
		this.cue_inst = this.cue.getComponent("cue");
		//START(点击下去)，MOVED(触摸移动)，ENDED(触摸在结点范围内弹起),CANCEL(节点范围外弹起)
        this.node.on(cc.Node.EventType.TOUCH_START,function(e){

        }.bind(this),this)

        this.node.on(cc.Node.EventType.TOUCH_MOVE,function(e){
            var w_pos = e.getLocation();    //触摸位置
            var dst = this.node.parent.convertToNodeSpaceAR(w_pos);//转换为白球父节点下对应的位置
            var src = this.node.getPosition();  //白球的位置
            var dir = cc.pSub(dst,src);
            var len = cc.pLength(dir);
            
            console.log(len);

            if(len<this.min_dis)
            {
                this.cue.active = false;//设置球杆隐藏
                return;
            }

            this.cue.active = true;
            var r = Math.atan2(dir.y,dir.x); //计算弧度
            var degree = r*180/Math.PI;  //换算成角度
            degree = 360 -degree;

            this.cue.rotation = degree +180;


            var cue_pos = dst;
            var cue_len_half = this.cue.width*0.5;//球杆的一半
            cue_pos.x += (cue_len_half*dir.x/len); 
            cue_pos.y += (cue_len_half*dir.y/len);
            this.cue.setPosition(cue_pos);
        }.bind(this),this)

        this.node.on(cc.Node.EventType.TOUCH_END,function(e){
            var white_pos = this.node.getPosition();
            if(this.cue.active == false)
            {
                return;
            }
            this.cue_inst.shoot_at(white_pos);
        }.bind(this),this)

        this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(e){
            var white_pos = this.node.getPosition();
            if(this.cue.active == false)
            {
                return;
            }
            this.cue_inst.shoot_at(white_pos);
        }.bind(this),this)
    },

    // update (dt) {},
});
