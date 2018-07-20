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
        SHOOT_POWER:18,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.body = this.getComponent(cc.RigidBody);  //获取
    },

    shoot_at(dst){
        //冲量：给这个球杆一个方向的冲量，矢量（大小和方向）
        //方向问题：src-->dst;
        var src = this.node.getPosition();
        var dir = cc.pSub(dst,src);

        //大小问题
        var cue_len_half = this.node.width*0.5;
        var len = cc.pLength(dir);
        var distance = len -cue_len_half;


        var power_x = distance*this.SHOOT_POWER*dir.x/len;
        var power_y = distance*this.SHOOT_POWER*dir.y/len;
        //applyLinearImpulse(冲量大小向量，球杆的原点转化为世界坐标)
        this.body.applyLinearImpulse(cc.p(power_x,power_y),this.node.convertToWorldSpaceAR(cc.p(0,0)),true);
    }

    // update (dt) {},
});
