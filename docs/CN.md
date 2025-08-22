  <p align="center">
    翻译 ➜&nbsp;
      <a href="../README.md"><img src="https://flagcdn.com/256x192/us.png" width="48" alt="United States Flag"></a>
      <a href="docs/TR.md"><img src="https://flagcdn.com/256x192/tr.png" width="48" alt="Turkey Flag"></a>
      <a href="docs/DE.md"><img src="https://flagcdn.com/256x192/de.png" width="48" alt="Germany Flag"></a>
      <a href="docs/ES.md"><img src="https://flagcdn.com/256x192/es.png" width="48" alt="Spain Flag"></a>
      <a href="docs/FR.md"><img src="https://flagcdn.com/256x192/fr.png" width="48" alt="France Flag"></a>
      <a href="docs/RU.md"><img src="https://flagcdn.com/256x192/ru.png" width="48" alt="Russia Flag"></a>
      <a href="docs/JA.md"><img src="https://flagcdn.com/256x192/jp.png" width="48" alt="Japan Flag"></a>
  </p>
  <br>
  <br>
  <p align="center"><strong>🎬┃ 视频演示</strong></p>

  <p align="center">
    <video src="https://github.com/user-attachments/assets/f655b939-d1a7-4449-b7dc-e50463e53c37" width="720" height="400" controls></video>
  </p>

  ---

  > [!NOTE]
  > **大家好，在新措施推出之后，我用一天时间完成了这个机器人。由于这些措施，目前似乎无法实现完全自动化的机器人。~~此前，我们借助一个漏洞，可以在一次验证后从 12 个账号在 1 秒内进行绘制（如果账号点数满的话，每秒可发送 12 * 62 = <strong>744</strong> 个像素）。~~ 更新后该漏洞已被修复，因此每次提交账号时都需要重新获取一次 token。准备好后，下面是使用说明。**

  ---

  <p align="center"><strong>WPlace UltraBOT</strong></p>

  <p align="center">
  你可以使用多个账号，将你想要的像素添加到 <a href="https://wplace.live" target="_blank">WPlace</a> 上。
  </p>

  ---

  <p align="center"><strong>🚀┃ 如何安装:</strong></p>

  <p align="center">
    这个bot容易上手，但精通却不容易。玩笑归玩笑，一开始用的时候可能会觉得有点难，不过在最新的措施推出后，已经没有其他bot能像它这样工作了，所以你的努力会很值得。
  </p>

  <br>

  ### 🔧┃安装 (CN)

  - 需要的组件:
    - Node.js >= 18.18.0

  - 步骤:
    1. 安装依赖:
      
      ```bash
      npm install
      ```
    2. 启动程序:
      
      ```bash
      npm start
      ```
    3. 在浏览器里打开 `http://localhost:3000` 。

  <details open>
    <summary><h2>📖┃教程</h2></summary>

  ---

  ![第1步](https://i.imgur.com/yS9093x.png)

  打开 localhost:3000 之后，你应该能看到这样的页面。<br>

  ---

  ![第2步](https://i.imgur.com/taF0I2T.png)

  打开新选项卡输入链接并回车： `chrome://extensions/`<br>
  打开开发者模式。 <br>

  ![](https://i.imgur.com/oe42A42.png)

  点击 "Load unpacked". <br>

  ![](https://i.imgur.com/jPyzOr3.png)

  选择文件夹 `WPlace-Helper` 。 <br>

  ---

  ![第3步](https://i.imgur.com/YVyvw3a.png)

  打开 wplace.live 的界面。 <br>
  按一下 F12。<br>
  在打开的页面中，从顶部选择 “Application” 选项（如果找不到，就点击我标黄色的地方，然后选择它）。<br>

  点击 `cf_clearance`，然后复制下方显示的值。<br>


  ---

  ![第4步](https://i.imgur.com/sJvyiC6.png)

  返回到bot界面。<br>
  点击 “Accounts” 按钮并添加一个账号。
  将你复制的值粘贴到该账号的 `cf_clearance` 输入框中，然后保存。


  ---

  ![第5步](https://i.imgur.com/vJkPMx8.png)

  进入 wplace.live，然后点击顶部的扩展程序图标，界面应该会像这样。<br>
  确认 “pixel token” 部分已启用后，像平常一样在地图上尝试绘制一个像素。
<br>

  ![第5步 (报错)](https://i.imgur.com/uZmJDad.png)

  如果你看到屏幕上的那个错误提示，说明你之前做对了。
  再次点击扩展程序，你会看到你刚才尝试绘制的位置对应的 “World X” 和 “World Y” 信息。
  把它们复制下来。

  ---

  ![第6步](https://i.imgur.com/LniE1E8.png)

  当你输入 World X 和 World Y 坐标并点击 “fetch” 按钮后，应该会出现一张类似图片中的地图。

  ---

  ![第7步](https://i.imgur.com/vJkPMx8.png)

  回到上一页，点击扩展程序，然后复制 “Account Token” 。

  ---

  ![第8步](https://i.imgur.com/8sjhH1L.png)

  接下来，你会进入 Accounts（账户）部分。
  点击 “Add Account” 按钮，然后就会出现上面显示的页面。

  ![第8步](https://i.imgur.com/jf6W8NV.png)

  你可以为这个账户输入任意名称。
  但是，在下面的 “Account Token” 字段中，需要粘贴你在上一步复制的值。
  最后，点击 “Add”（添加）按钮。

  ---

  ![第9步](https://i.imgur.com/DJUEywj.png)

  当你添加了所需数量的账号后，你可以在右上角看到
  所有账号的像素总数以及可用像素数。

  你上传的图片会自动转换为网站提供的免费调色板中的颜色，并以这种方式上传。
  该系统未来还会进一步优化。

  当你使用 Upload Image（上传图片）按钮上传图片后：

  图片左上角 会显示完成该图片所需的像素数量；
  图片右上角 有一个锁形按钮，锁定后图片将无法移动；
  点击 “X” 则会删除该图片。
  你可以在左侧栏看到你上传的所有图片。
  如果你在页面上找不到某张图，只需在左侧栏点击它，就会直接跳转到该图片的位置。

  ---

  ![第10步](https://i.imgur.com/Dzt1p3o.png)

  点击 “Ready” 按钮。在弹出的窗口中，点击 “Select Account” 选择你要启用的账号。选择完成后，再次点击 “Select Account” 以关闭窗口。

  ---

  ![第11步](https://i.imgur.com/QKJRVL9.png)

  当你放大图片时，你填充的每一个透明像素，都会被替换成你上传图片中对应位置的颜色，
  并且你只能在图片的边界范围内放置像素。

  如果你选择了某一种特定颜色，那么在不超过你最大像素数量的前提下，你可以在任意位置绘制像素。

  ---

  ![第12步](https://i.imgur.com/vJkPMx8.png)

  返回 wplace 页面，由于上一个 token 已经过期，你必须绘制一个新的像素，并复制新的 pixel token。

  ---

  ![第13步](https://i.imgur.com/wDp07pH.png)

  然后，返回到bot页面，将该值粘贴到 “token” 字段中，并点击 “Start”。

  ---

  ![第14步](https://i.imgur.com/iQTH5TR.png)

  果你一切操作正确，你应该会收到类似这样的通知，并且地图上的更改已经被处理完成。就是这么简单：重复这些步骤，你就可以创建任何你想要的图像。

  </details>


  <br>

  > [!注意]
  > <p><sub><strong>1.</strong> 在 **Accounts**（账户）部分，如果你点击 **“Check Pixel”**，可以手动检查该账户剩余的像素。通常情况下，这个操作会每 90 秒自动进行一次。</sub></p>
  > <p><sub><strong>2.</strong> 账户 token 的有效期大约为 3–4 小时。在自动检测账户时，如果 token 已经过期，该账户会变为非激活状态。你可以在 **Edit**（编辑）部分输入新的 token，并点击 **Check Pixel** 来重新激活它。</sub></p>
  > <p><sub><strong>3.</strong> 一旦提交 token 出现在面板上，你需要尽快操作。如果动作太慢，token 就会过期，你将收到 **403 refresh** 错误。</sub></p>

  <br>


  由于整个项目是在一天之内完成的，如果你发现任何不足之处，或者有希望添加的功能，请务必反馈给我们。

  ---






  <p align="center">
    <img src="https://i.imgur.com/msR5dM9.png" alt="Main"/>
  </p>

  ---

  ### 📋┃To-do

  - [x] 翻译 [TR/USA]  
  - [ ] 修复一些bug  
  - [x] 教程


  ---


  <p align="center">
    <a href="#"><img src="https://komarev.com/ghpvc/?username=xacter&repo=WPlace-UltraBOT&style=for-the-badge&label=Views:&color=gray"/></a>
  </p>

  ---







