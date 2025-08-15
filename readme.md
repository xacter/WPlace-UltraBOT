<p align="center">
  Translations ➜&nbsp;
    <a href="docs/TR.md"><img src="https://flagcdn.com/256x192/tr.png" width="48" alt="Turkey Flag"></a>
</p>

---

> [!NOTE]
> **Hello, after the new measures were introduced, I decided to develop this bot, and it was completed in just one day. Due to the measures, it seems impossible to create a fully automated bot for now. However, thanks to a current exploit, we can draw from 12 accounts in one second with a single verification. Assuming the accounts are full, we can send 12 * 62 = <strong>744</strong> pixels per second. If you're ready, I've explained how to use it below.**

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

![Part 2](https://i.imgur.com/r02ndS6.png)


Open the area on Wplace where you want to draw.<br>
Place 1 pixel.<br>
Press the 'F12' button.<br>
Go to the 'Network' tab and type 'png' in the filter.<br>
Click the 'F5' button.<br>
You should see png files like in the picture, then click on one.<br>

https://backend.wplace.live/files/s0/tiles/1188/767.png<br>

We have reached this link. Here, '1188' represents the World X part and '767' represents the World Y part.<br>






---

![Part 3](https://i.imgur.com/LniE1E8.png)


When you enter the World X and World Y coordinates and click the 'fetch' button, a map like the one in the image should appear.


---

![Part 4](https://i.imgur.com/FlXoyc7.png)

Go back to the previous page and type 'me' into the search bar. Click on the result that appears. On the page that opens, scroll down and copy the 'cf_clearance' value. Similarly, copy the value from the part that says 'j' and save them both somewhere.

---
![Part 5](https://i.imgur.com/IvNN9EZ.png)

Click on the "Accounts" button, then click the "Settings" button. Paste the value you copied into the field labeled 'cf_clearance' and save it.

---
![Part 6](https://i.imgur.com/8sjhH1L.png)

![Part 6](https://i.imgur.com/jf6W8NV.png)


Next, you'll be taken to the Accounts section. Click the "Add Account" button. The page shown above will then appear.

You can enter any name for the account. However, in the "Account Token" field below, paste the value you copied in the previous step. Finally, click "Add".





---
![Part 8](https://i.imgur.com/DJUEywj.png)


After you've uploaded as many accounts as you want, you can see the total number of pixels and your available pixels for all your accounts in the top right corner.

The image you upload is automatically converted to the free color palettes available on the site and is uploaded that way. This system will be improved further in the future

Once you upload an image using the Upload Image button:

On the top left of the image, the number of pixels required for the image will be displayed.

On the top right of the image, there's a lock button. When you lock it, you can't move the image. Clicking the 'X' will delete the image.

You can see all your uploaded images in the bar on the left. If you can't find an image on the page, just click on it in the bar, and it will take you directly to the image.


---
![Part 9](https://i.imgur.com/Dzt1p3o.png)

Click the Ready button. In the window that appears, click Select Account to choose your active accounts. When you're done, click Select Account again to close the window.

---
![Part 10](https://i.imgur.com/QKJRVL9.png)

When you zoom in on the image, every transparent pixel you fill will be colored with the corresponding color from your uploaded image, and you can only place pixels within the image's boundaries. If you select a specific color, you can paint anywhere you want, up to your maximum pixel capacity.


---
![Part 11](https://i.imgur.com/s3hIJFD.png)


Go back to the Wplace page, and in the search bar, enter the World Y value. Fill in one pixel, then find the area I've marked on the right, right-click, and select Block request URL.



---

![Part 12](https://i.imgur.com/NEvGOnj.png)

Then, try to fill a pixel in the same spot again. This time it should give an error. Click on the request that gave the error, then click on the 'Payload' tab. If you click on 'view sourced', it will look like mine. After that, copy the 't' value completely.




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
> <p><sub><strong>2.</strong> Account tokens last for about 4-5 hours. During the automatic account check, if a token has expired, the account will become inactive. You can re-activate it by entering the new token in the Edit section and clicking Check Pixel.</sub></p>
> <p><sub><strong>3.</strong> Once the submission token appears on the panel, you need to be quick. If you are too slow, the token will expire and you will get a 403 refresh error.</sub></p>

<br>


Since the entire project was prepared in one day, please don't forget to report any shortcomings you see or features you'd like to request.


---






<p align="center">
  <img src="https://i.imgur.com/iOO5nFF.png" alt="Main"/>
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




