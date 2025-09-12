  <p align="center">
    Translations ➜&nbsp;
      <a href="docs/AR.md"><img src="https://flagcdn.com/256x192/sa.png" width="48" alt="Suadi Flag"></a>
      <a href="docs/TR.md"><img src="https://flagcdn.com/256x192/tr.png" width="48" alt="Turkey Flag"></a>
      <a href="docs/DE.md"><img src="https://flagcdn.com/256x192/de.png" width="48" alt="Germany Flag"></a>
      <a href="docs/ES.md"><img src="https://flagcdn.com/256x192/es.png" width="48" alt="Spain Flag"></a>
      <a href="docs/FR.md"><img src="https://flagcdn.com/256x192/fr.png" width="48" alt="France Flag"></a>
      <a href="docs/RU.md"><img src="https://flagcdn.com/256x192/ru.png" width="48" alt="Russia Flag"></a>
      <a href="docs/JA.md"><img src="https://flagcdn.com/256x192/jp.png" width="48" alt="Japan Flag"></a>
      <a href="docs/CN.md"><img src="https://flagcdn.com/256x192/cn.png" width="48" alt="China Flag"></a>
  </p>
  <br>
  <br>
  <p align="center"><strong>🎬┃ Video Preview</strong></p>

  <p align="center">
    <video src="https://github.com/user-attachments/assets/f655b939-d1a7-4449-b7dc-e50463e53c37" width="720" height="400" controls></video>
  </p>
  <p align="center"><strong>New feature usage</strong></p>

 <p align="center">
    <video src="https://github.com/user-attachments/assets/80409e34-79a3-42ab-b298-c062e7ffe1c1" width="720" height="400" controls></video>
  </p>
  ---

  > [!NOTE]
  > **Hello, after the new measures were introduced, I decided to develop this bot, and it was completed in just one day. Due to the measures, it seems impossible to create a fully automated bot for now. ~~Previously, thanks to an exploit, we could draw from 12 accounts in one second with a single verification (12 * 62 = <strong>744</strong> pixels/s if accounts were full).~~ After the update, this vulnerability has been fixed, so you will need to obtain a token again for each account submission. If you're ready, I've explained how to use it below.**

  ---

  <p align="center"><strong>WPlace UltraBOT</strong></p>

  <p align="center">
    You can add your desired pixels to <a href="https://wplace.live" target="_blank">WPlace</a> with your multiple accounts.
  </p>

  ---

  <p align="center"><strong>🚀┃ How to install the bot:</strong></p>

  <p align="center">
  The bot is easy to set up but hard to master. All kidding aside, it might seem difficult to use at first, but after the latest measures, there's no other bot that works like this, so it will be worth your effort.
  </p>

  <br>

  ### 🔧┃Installation (EN)

  - Requirements:
    - Node.js >= 18.18.0

  - Steps:
    1. Install dependencies:
      
      ```bash
      npm install
      ```
    2. Start the app:
      
      ```bash
      npm start
      ```
    3. Open `http://localhost:3000` in your browser.

  <details open>
    <summary><h2>📖┃Tutorial</h2></summary>

  ---

  ![Part 1](https://i.imgur.com/yS9093x.png)

  When you go to localhost:3000, you should see a page like this.<br>

  ---

  ![Part 2](https://i.imgur.com/taF0I2T.png)

  Open a new tab and go to this link: `chrome://extensions/`<br>
  Enable developer mode. <br>

  ![](https://i.imgur.com/oe42A42.png)

  Click "Load unpacked". <br>

  ![](https://i.imgur.com/jPyzOr3.png)

  Select the `WPlace-Helper` folder. <br>

  ---

  ![Part 3](https://i.imgur.com/YVyvw3a.png)

  Go to the wplace.live page. <br>
  Press F12.<br>
  On the page that opens, select the 'Application' section from the top (if you can't find it, click on the place I've shown in yellow and select it).<br>
  Click on `cf_clearance` and copy its value from below.<br>

  ---

  ![Part 4](https://i.imgur.com/tR8pS53.png)

  Go back to the bot.<br>
  Click on the "Accounts" button, then click the "Add Account" button. Paste the value you copied into the field labeled 'cf_clearance'  <br>
  Note ! <br>
  With the latest update, they have taken countermeasures, so you now need to enter a cf_clearance value for each account. To do this quickly, just go to the wplace.live page in an incognito tab and get the token. You don't need to log in.



  ---

  ![Part 5](https://i.imgur.com/vJkPMx8.png)

  Go to wplace.live, and when you click on the extension from the top, it should look like this.<br>
  After making sure the "pixel token" section is enabled, try to paint a pixel on the map normally. <br>

  ![Part 5 (Error)](https://i.imgur.com/uZmJDad.png)

  If you get the error you see on the screen, it means you are on the right track. Click on the extension again, and the "World X" and "World Y" information for the place you tried to paint will appear. Copy them.

  ---

  ![Part 6](https://i.imgur.com/LniE1E8.png)

  When you enter the World X and World Y coordinates and click the 'fetch' button, a map like the one in the image should appear.

  ---

  ![Part 7](https://i.imgur.com/vJkPMx8.png)

  Go back to the previous page, click on the extension, and copy the "Account Token" value.

  ---

  ![Part 8](https://i.imgur.com/8sjhH1L.png)

  Next, you'll be taken to the Accounts section. Click the "Add Account" button. The page shown above will then appear.

  ![Part 8](https://i.imgur.com/jf6W8NV.png)

  You can enter any name for the account. However, in the "Account Token" field below, paste the value you copied in the previous step. Finally, click "Add".

  ---

  ![Part 9](https://i.imgur.com/DJUEywj.png)

  After you've added as many accounts as you want, you can see the total number of pixels and your available pixels for all your accounts in the top right corner.

  The image you upload is automatically converted to the free color palettes available on the site and is uploaded that way. This system will be improved further in the future.

  Once you upload an image using the Upload Image button:

  On the top left of the image, the number of pixels required for the image will be displayed.

  On the top right of the image, there's a lock button. When you lock it, you can't move the image. Clicking the 'X' will delete the image.

  You can see all your uploaded images in the bar on the left. If you can't find an image on the page, just click on it in the bar, and it will take you directly to the image.

  ---

  ![Part 10](https://i.imgur.com/Dzt1p3o.png)

  Click the Ready button. In the window that appears, click Select Account to choose your active accounts. When you're done, click Select Account again to close the window.

  ---

  ![Part 11](https://i.imgur.com/QKJRVL9.png)

  When you zoom in on the image, every transparent pixel you fill will be colored with the corresponding color from your uploaded image, and you can only place pixels within the image's boundaries. If you select a specific color, you can paint anywhere you want, up to your maximum pixel capacity.

  ---

  ![Part 12](https://i.imgur.com/vJkPMx8.png)

  Return to the wplace page and since the previous token has expired, try to send a new pixel and copy the new pixel token.

  ---

  ![Part 13](https://i.imgur.com/wDp07pH.png)

  Then, return to our page, paste the value into the 'token' field, and click 'Start'.

  ---

  ![Part 14](https://i.imgur.com/iQTH5TR.png)

  If you have done everything correctly, you should receive a notification like this, and the changes should have been processed on the map. That's all there is to it; you can create any image you want by repeating these steps.

  </details>


  <br>

  > [!IMPORTANT]
  > <p><sub><strong>1.</strong> In the Accounts section, if you click on 'Check Pixel', you can manually check the remaining pixels for that account. Normally, this is done automatically every 90 seconds.</sub></p>
  > <p><sub><strong>2.</strong> Account tokens last for about 3-4 hours. During the automatic account check, if a token has expired, the account will become inactive. You can re-activate it by entering the new token in the Edit section and clicking Check Pixel.</sub></p>
  > <p><sub><strong>3.</strong> Once the submission token appears on the panel, you need to be quick. If you are too slow, the token will expire and you will get a 403 refresh error.</sub></p>

  <br>


  Since the entire project was prepared in one day, please don't forget to report any shortcomings you see or features you'd like to request.


  ---






  <p align="center">
    <img src="https://i.imgur.com/msR5dM9.png" alt="Main"/>
  </p>

  ---

  ### 📋┃To-do

  - [x] Translations [TR/USA]  
  - [ ] Fix script bugs  
  - [x] Tutorials


  ---


  <p align="center">
    <a href="#"><img src="https://komarev.com/ghpvc/?username=xacter&repo=WPlace-UltraBOT&style=for-the-badge&label=Views:&color=gray"/></a>
  </p>

  ---









