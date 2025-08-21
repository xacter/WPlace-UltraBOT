<p align="center">
  翻訳 ➜&nbsp;
  <a href="../README.md"><img src="https://flagcdn.com/256x192/us.png" width="48" alt="United States Flag"></a>
  <a href="TR.md"><img src="https://flagcdn.com/256x192/tr.png" width="48" alt="Turkey Flag"></a>
  <a href="DE.md"><img src="https://flagcdn.com/256x192/de.png" width="48" alt="Germany Flag"></a>
  <a href="ES.md"><img src="https://flagcdn.com/256x192/es.png" width="48" alt="Spain Flag"></a>
  <a href="FR.md"><img src="https://flagcdn.com/256x192/fr.png" width="48" alt="France Flag"></a>
  <a href="RU.md"><img src="https://flagcdn.com/256x192/ru.png" width="48" alt="Russia Flag"></a>
  <a href="CN.md"><img src="https://flagcdn.com/256x192/cn.png" width="48" alt="China Flag"></a>
</p>

---

> [!NOTE]
> **新しい対策が導入された後、このボットを開発し、わずか1日で完成しました。これらの対策により、現時点では完全自動のボットを作ることは不可能に見えます。~~以前は、既存の脆弱性を利用して、1回の認証で1秒あたり12アカウントから描画できました（アカウントが満タンなら 12 * 62 = <strong>744</strong> ピクセル/秒）。~~ その後のアップデートでこの脆弱性は修正され、各アカウント送信のたびに新しいトークンが必要になりました。準備ができたら、使い方を以下に説明します。**

---

<p align="center"><strong>WPlace UltraBOT</strong></p>

<p align="center">
  複数のアカウントを使って、<a href="https://wplace.live" target="_blank">WPlace</a> に希望するピクセルを追加できます。
</p>

---

<p align="center"><strong>🚀┃ ボットのインストール方法:</strong></p>

<p align="center">
  セットアップは簡単ですが、使いこなすのは難しいです。冗談はさておき、最初は使いづらく感じるかもしれません。しかし最新の対策後、このように動作する他のボットは存在しないため、労力に見合います。
</p>

<br>

### 🔧┃インストール (JA)

- 必要条件:
  - Node.js >= 18.18.0

- 手順:
  1. 依存関係をインストール:
     
     ```bash
     npm install
     ```
  2. アプリを起動:
     
     ```bash
     npm start
     ```
  3. ブラウザで `http://localhost:3000` を開く。

<details open>
  <summary><h2>📖┃ガイド</h2></summary>

---

![パート1](https://i.imgur.com/yS9093x.png)

`localhost:3000` にアクセスすると、このようなページが表示されます。<br>

---

![パート2](https://i.imgur.com/taF0I2T.png)

新しいタブを開き、`chrome://extensions/` に移動します。<br>
デベロッパーモードを有効にします。<br>

![](https://i.imgur.com/oe42A42.png)

「Load unpacked」をクリック。<br>

![](https://i.imgur.com/jPyzOr3.png)

`WPlace-Helper` フォルダを選択。<br>

---

![パート3](https://i.imgur.com/YVyvw3a.png)

`wplace.live` を開きます。<br>
`F12` を押します。<br>
開いたウィンドウの上部で「Application」タブを選択します（見つからない場合は、黄色で示した場所をクリックして選択）。<br>
`cf_clearance` をクリックし、下に表示される値をコピーします。<br>

---

![パート4](https://i.imgur.com/sJvyiC6.png)

ボットに戻ります。<br>
「Accounts」ボタンをクリックし、続けて「Settings」ボタンをクリック。コピーした値を `cf_clearance` に貼り付けて保存します。

---

![パート5](https://i.imgur.com/vJkPMx8.png)

`wplace.live` に移動します。上部の拡張機能をクリックすると、このように表示されます。<br>
「pixel token」セクションが有効であることを確認したら、通常どおりマップ上にピクセルを1つ塗ってみてください。<br>

![パート5（エラー）](https://i.imgur.com/uZmJDad.png)

このエラーが表示された場合、正しい手順で進んでいます。再度拡張機能をクリックすると、塗ろうとした場所の「World X」と「World Y」の情報が表示されます。これらをコピーします。<br>

---

![パート6](https://i.imgur.com/LniE1E8.png)

World X と World Y の座標を入力し、「fetch」をクリックすると、画像のようなマップが表示されます。<br>

---

![パート7](https://i.imgur.com/vJkPMx8.png)

前のページに戻り、拡張機能をクリックして「Account Token」をコピーします。

---

![パート8](https://i.imgur.com/8sjhH1L.png)

![パート8](https://i.imgur.com/jPyzOr3.png)

その後、アカウントページへ移動します。「Add Account」をクリック。表示されたページで:
- アカウント名は自由に入力できます。
- 「Account Token」欄に、前の手順でコピーした値を貼り付けます。
- 最後に「Add」をクリックします。

---

![パート9](https://i.imgur.com/DJUEywj.png)

必要な数だけアカウントを追加したら、右上にすべてのアカウントの合計ピクセル数と利用可能なピクセル数が表示されます。<br>
アップロードした画像は、サイトで提供されている無料のカラーパレットに自動変換され、そのままアップロードされます。この仕組みは今後さらに改善されます。

「Upload Image」ボタンで画像をアップロードしたら:

- 画像の左上に、その画像に必要なピクセル数が表示されます。
- 画像の右上にロックボタンがあります。ロックすると画像は移動できません。「X」を押すと画像を削除します。
- 左側のバーですべてのアップロード済み画像を確認できます。ページ上で画像が見つからない場合は、バーの画像をクリックすると、その画像へ直接移動します。

---

![パート10](https://i.imgur.com/Dzt1p3o.png)

「Ready」ボタンをクリック。表示されたウィンドウで「Select Account」をクリックし、アクティブなアカウントを選択します。終わったら、再度「Select Account」をクリックしてウィンドウを閉じます。

---

![パート11](https://i.imgur.com/QKJRVL9.png)

画像を拡大すると、塗りつぶした透明ピクセルは、アップロードした画像の対応する色で塗られます。ピクセルは画像の境界内にのみ配置できます。特定の色を選べば、最大ピクセル数の範囲で自由に塗ることができます。

---

![パート12](https://i.imgur.com/vJkPMx8.png)

WPlace のページに戻り、前のトークンは期限切れなので、新しいピクセルを送って新しい「pixel token」をコピーします。

---

![パート13](https://i.imgur.com/wDp07pH.png)

その後、当ページに戻り、値を「token」フィールドに貼り付けて「Start」をクリックします。

---

![パート14](https://i.imgur.com/iQTH5TR.png)

すべて正しく実行できていれば、このような通知が表示され、マップに変更が反映されます。以上です。これらの手順を繰り返して、好きな画像を作成してください。

</details>

<br>

> [!IMPORTANT]
> <p><sub><strong>1.</strong> アカウントページの「Check Pixel」をクリックすると、そのアカウントの残りピクセル数を手動で確認できます。通常は90秒ごとに自動で行われます。</sub></p>
> <p><sub><strong>2.</strong> アカウントトークンの有効期間はおよそ3〜4時間です。自動チェックでトークンの有効期限が切れている場合、そのアカウントは非アクティブになります。編集から新しいトークンを入力して「Check Pixel」を押せば再度有効化できます。</sub></p>
> <p><sub><strong>3.</strong> 送信用トークンがパネルに表示されたら、素早く操作してください。遅いとトークンの有効期限が切れ、403の更新エラーが発生します。</sub></p>

<br>

本プロジェクトは1日で作成したため、不足点や希望する機能があればぜひお知らせください。

---

<p align="center">
  <img src="https://i.imgur.com/msR5dM9.png" alt="メイン"/>
</p>

---

### 📋┃To-do

- [x] 翻訳 [TR/USA]
- [ ] スクリプトのバグ修正
- [x] ガイド

---

<p align="center">
  <a href="#"><img src="https://komarev.com/ghpvc/?username=xacter&repo=WPlace-UltraBOT&style=for-the-badge&label=Views:&color=gray"/></a>
</p>


