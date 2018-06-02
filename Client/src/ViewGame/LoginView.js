"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextField_1 = require("../IU/TextField");
const viewGame_1 = require("./viewGame");
const Button_1 = require("../IU/Button");
const App_1 = require("../Const/App");
const Panel_1 = require("../IU/Panel");
const Identity_1 = require("../IU/Identity");
/**
 * Created by Vu Tien Dai on 01/08/2017.
 */
class Login extends PIXI.Container {
    constructor(player) {
        super();
        this.createLogin = (name, pass) => {
            this.removeChildren();
            let backgroud = PIXI.Sprite.fromImage(App_1.App.AssetDir + 'Picture/background.jpg');
            backgroud.width = 1200;
            backgroud.height = 640;
            let txtUsername = new TextField_1.TextField(385, 237);
            txtUsername.setText(name);
            txtUsername.scale.set(0.4);
            let txtPassword = new TextField_1.TextField(385, 300);
            txtPassword.setText(pass);
            txtPassword.scale.set(0.4);
            txtUsername.onEnterPress = () => {
                this.player.emit("login", { name: txtUsername.getText(), pass: txtPassword });
                this.player.username = txtUsername.getText();
                txtUsername.setText("");
                txtPassword.setText("");
                this.player.emit("get room list");
            };
            txtUsername.onClick = () => {
                txtUsername.setText("");
            };
            txtPassword.onClick = () => {
                txtPassword.setText("");
            };
            let Loginbtn = new Button_1.Button(435, 405, "", App_1.App.AssetDir + "Picture/IU/loginbtn.png");
            let Signup = new Button_1.Button(580, 405, "", App_1.App.AssetDir + "Picture/IU/signup.png");
            Loginbtn.setSize(new PIXI.Point(100, 50));
            Signup.setSize(new PIXI.Point(100, 50));
            Loginbtn.onClick = () => {
                if (txtUsername.getText() != "") {
                    this.player.emit("login", { name: txtUsername.getText(), pass: txtPassword.getText() });
                    this.player.on("login_wrong", () => {
                        Panel_1.Panel.showMessageDialog("Sai ten hoac pass", () => { }, false);
                    });
                    // txtUsername.setText("");
                    // txtPassword.setText("");
                }
            };
            Signup.onClick = () => {
                this.createSignup();
            };
            this.addChild(backgroud, txtUsername, txtPassword, Loginbtn, Signup);
        };
        this.player = player;
        this.createLogin("", "");
        viewGame_1.viewGame.sound.play_BG("Login");
    }
    createSignup() {
        this.removeChildren();
        let backgroud = PIXI.Sprite.fromImage(App_1.App.AssetDir + 'Picture/background.jpg');
        backgroud.width = 1200;
        backgroud.height = 640;
        let txtUsername = new TextField_1.TextField(385, 237);
        txtUsername.scale.set(0.4);
        let txtPassword = new TextField_1.TextField(385, 300);
        txtPassword.scale.set(0.4);
        let sex = new Identity_1.Identity();
        sex.position.set(405, 345);
        let Signup = new Button_1.Button(435, 405, "", App_1.App.AssetDir + "Picture/IU/signup.png");
        Signup.setSize(new PIXI.Point(100, 50));
        let Back = new Button_1.Button(580, 405, "", App_1.App.AssetDir + "Picture/IU/outroom.png");
        Back.setSize(new PIXI.Point(100, 50));
        this.addChild(backgroud, txtUsername, txtPassword, Signup, Back, sex);
        Signup.onClick = () => {
            if (txtUsername.getText() != "" && txtPassword.getText() != "") {
                this.player.emit("signup", { name: txtUsername.getText(), pass: txtPassword.getText(), sex: sex.sex });
            }
            this.player.on("sign_up", (data) => {
                if (data == true) {
                    Panel_1.Panel.showMessageDialog("Dang ki thanh cong", () => {
                        this.createLogin(txtUsername.getText(), txtPassword.getText());
                    }, false);
                }
                else
                    Panel_1.Panel.showMessageDialog("User name da ton tai", () => { }, false);
            });
        };
        Back.onClick = () => {
            this.createLogin("", "");
        };
    }
}
exports.Login = Login;
//# sourceMappingURL=LoginView.js.map