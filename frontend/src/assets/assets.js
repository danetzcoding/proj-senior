import logo from './logo.png'
import search_icon from './search_icon.png'
import basket_icon from './basket_icon.png'
import menu_1 from './menu_1.png'
import menu_2 from './menu_2.png'
import menu_3 from './menu_3.png'
import food_1 from './food_1.png'

export const assets = {
    logo,
    search_icon,
    basket_icon,
    menu_1,
    menu_2,
    menu_3
}

export const question_list = [
  {
    _id: "1",
    question: "How do I make sure that my files are syncing to OneDrive?",
    answer: `✅ How to Make Sure Your Files Are Syncing to OneDrive

🧠 What is OneDrive?
OneDrive is Microsoft’s cloud storage — it keeps a backup of your files online so you don’t lose them if something happens to your computer.

✅ Step 1: Look for the OneDrive icon in the bottom-right corner
1. Look near the clock in the bottom-right corner.
2. You should see a cloud icon:
   - ☁️ Blue cloud = syncing and connected
   - ✅ Green check = synced
   - ❌ Red X = problem
   - 🔄 Circular arrows = syncing

✅ Step 2: Click the OneDrive icon
- You'll see recent files and sync status.
- If it says "Up to date," or "Your files are synced," you're good!

✅ Step 3: Test it
- Save a file to your Documents folder.
- Check if it appears in the OneDrive window (accessible by clicking the cloud/OneDrive icon).

✅ Step 4: Check from your phone (optional)
- Install the OneDrive app.
- Open it and check for your test file.

💬 Summary:
☁️ = Syncing | ✅ = Synced | ❌ = Issue | 🔄 = In progress`
  },
  {
    _id: "2",
    question: "What’s the difference between OneDrive, Google Drive, and Dropbox?",
    answer: `These are all services that let you store files online (called "cloud storage"), but they come from different companies:

- **OneDrive** is from Microsoft and is built into Windows computers.
- **Google Drive** is from Google and connects to your Gmail and Android devices.
- **Dropbox** is a separate company focused on easy file sharing and syncing.

They all do similar things, like letting you save photos and documents online, access them from anywhere, and share with others. The main differences are how they integrate with other apps you use and how much free space they offer.`
  },
  {
    _id: "3",
    question: "Why do I see two versions of the same file?",
    answer: `Sometimes OneDrive or other cloud services create a second version of a file because:

- You edited the file on two devices before they synced.
- There was a sync conflict (both copies changed at the same time).
- Your computer was offline when saving.

The second file usually has "copy" or a date added to its name. You can compare the files and keep the one you want, then delete the duplicate.`
  },
  {
    _id: "4",
    question: "How do I back up my files?",
    answer: `Backing up means saving copies of your important files so you don’t lose them.

You can back up your files by:

- Using OneDrive or another cloud service that saves your files online automatically.
- Copying files to an external hard drive or USB stick.
- Using backup software that regularly saves your files to a safe place.

For most people, turning on OneDrive backup for Documents, Pictures, and Desktop folders is easiest and safest.`
  },
  {
    _id: "5",
    question: "What is a password manager, and do I need one?",
    answer: `A password manager is an app that safely stores all your passwords for websites and apps.

- It helps you create strong passwords.
- You only need to remember one master password.
- It fills in your passwords automatically when you log in.

If you have trouble remembering many passwords, using a password manager is very helpful and makes online life easier and safer.

An example of a good, trustworthy password manager is 1Password.
`
  },
  {
    _id: "6",
    question: "How do I send an attachment with an email?",
    answer: `To send a file with your email:

1. Open your email and click "New message" or "Compose."
2. Look for a paperclip icon or "Attach file" button.
3. Click it and select the file (like a photo or document) from your computer.
4. Wait for it to upload, then send your email.

The recipient will get the file along with your message.`
  },
  {
    _id: "7",
    question: "What is the difference between CC and BCC?",
    answer: `When sending an email:

- **CC (Carbon Copy)** means all recipients can see everyone else’s email address.
- **BCC (Blind Carbon Copy)** hides the email addresses from other recipients.

Use BCC when you don’t want to share everyone’s email with the group, like when sending to many people who don’t know each other.`
  },
  {
    _id: "8",
    question: "How do I get files on my computer to my phone and vice versa?",
    answer: `To move files between your computer and phone:

- Use cloud storage like OneDrive or Google Drive. Save files on one device, and access them on the other.
- Use a USB cable to connect your phone to your computer and copy files manually.
- Use apps like email or messaging apps to send files to yourself.

Cloud storage is easiest because it works wirelessly and automatically.`
  },
  {
    _id: "9",
    question: "Why does my phone keep saying ‘Storage Full’?",
    answer: `This means your phone’s memory is almost full.

To fix this:

- Delete old photos, videos, or apps you don’t use.
- Move files to cloud storage like OneDrive or Google Photos.
- Clear app caches or temporary files in your phone’s settings.

Freeing up space will help your phone run better.`
  },
  {
    _id: "10",
    question: "Why is my computer so slow?",
    answer: `Computers get slower because:

- Too many programs running at the same time.
- Not enough free space on the hard drive.
- Too many files or temporary data.
- Needing updates or scans for viruses.

Try closing programs you aren’t using, deleting unneeded files, restarting your computer, or asking someone to help check it.`
  },
  {
    _id: "11",
    question: "How do I clean up space on my phone or PC?",
    answer: `To free up space:

- Delete unused apps.
- Remove old photos and videos or move them to cloud storage.
- Clear cache or temporary files (found in settings).
- On Windows PC, use the built-in Disk Cleanup tool.

Regular cleaning helps devices run smoothly.`
  },
  {
    _id: "12",
    question: "How do I make the text bigger on my phone?",
    answer: `To make text easier to read on your phone:

- On iPhone: Go to Settings > Display & Brightness > Text Size, then adjust the slider.
- On Android: Go to Settings > Display > Font size or Text size, then increase it.

You can also enable "Bold Text" or "Magnification" in accessibility settings for better visibility.`
  }
]