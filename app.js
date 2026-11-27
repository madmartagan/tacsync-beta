/* TAC-SYNC. Copyright (c) 2026. All rights reserved. */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, collection, query, where, onSnapshot, updateDoc, setDoc, getDoc, deleteDoc, getDocFromServer, runTransaction, serverTimestamp, deleteField } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvkWldP_pkALVJJ2m0_1o7h2P4aAW4SM0",
  authDomain: "tacsync-466ab.firebaseapp.com",
  projectId: "tacsync-466ab",
  storageBucket: "tacsync-466ab.firebasestorage.app",
  messagingSenderId: "589173582236",
  appId: "1:589173582236:web:d46ab78f84efab569c4059"
};
/* The admin signs in with a real Firebase account (email + password).
   There is no password in this file. The Firestore rules decide who may act as admin. */

/* ================= TRANSLATIONS =================
   To fix a phrase, edit it here. {name} parts are filled in by the app. */
const LANGS = { en: 'English', fr: 'Français', es: 'Español', ar: 'العربية', ko: '한국어', ja: '日本語' };
const VOICE = { en: 'en-US', fr: 'fr-FR', es: 'es-ES', ar: 'ar-SA', ko: 'ko-KR', ja: 'ja-JP' };
const L = {
en: {
 profHdr:'YOUR PROFILE', namePh2:'In-game name', nameReq:'Enter your in-game name.', marHdr:'March time to each target', marReq:'Enter all five march times.', tC:'Center', tN:'North', tS:'South', tE:'East', tW:'West', saveProf:'Save', editProf:'Edit profile', profSaved:'Profile saved', pickTarget:'Pick a target on the map', mapHdr:'TARGETS', defBadge:'DEF', chooseAct:'{t} · choose your role', defendAnyway:'Defend anyway', leave:'↺ Leave this target', meLine:'{n} · {t} · {r}', meNone:'{n} · no target', roleLeadSym:'lead {s}', roleJoinOf:'joining {s}', roleDef:'defending', joinedList:'Joined: {n}', nobodyJoined:'No joiners yet', symEntry:'{t} · your 2-letter symbol', groupBtn:'GROUP RALLY', soloBtn:'SOLO RALLY', chooseMode:'{t} · {s} · group or solo?', unregister:'Unregister', grpNotCalled:'Waiting for the admin to call a group', grpReset:'The group was reset', rejoin:'Rejoin group', soloRatio:'{t} · {s} · troop ratio', startBtn:'START', ratioErr:'Enter a troop ratio that adds up to 100.', ratioPh:'Shieldbearers/Bombers/Shooters', troops:'Troops {r}', gathering:'{t} · {s} gathering', gatheringEst:'{t} · {s} gathering (est.)', syncGather:'Sync', gatherPh:'timer', syncedOk:'Synced', estTag:'est.', prepReinforce:'Prepare to reinforce', verifying:'Verifying success', winBtn:'Attack successful', failBtn:'Attack not successful', say_reinforce:'Prepare to reinforce', say_verify:'Verifying success', say_disband:'Rally disbanded', say_defense:'Switching to defense', pickLead:'{t} · pick a rally', noLeadsHere:'No rally leads on {t} yet', joiningSym:'{t} · joining {s}', disbanded:'Rally disbanded', pickAgain:'pick another rally', defending:'{t} · defending', noIncoming:'no incoming attacks yet', nowDef:'{t} is now in defense. If you are not defending, pick another role.', youDef:'You are now defending {t}.', mgTarget:'MANAGE TARGET', myTargetBtn:'My target', subAtk:'Attack', subDef:'Defense', grpHdr:'GROUP RALLY', callGroup:'Call group', endGroup:'End group', endGroupQ:'End the group on {t}? Leads go back to choosing group or solo.', setRatio:'Set', ralliesHdr:'RALLIES ON {t}', noRallies:'No rallies running.', soloTag:'solo', groupTag:'group', ratioOv:'ratio', phGather:'Gathering {x}', phGatherEst:'Gathering {x} (est.)', phMarch:'Marching {x}', phVerify:'Verifying', winQ:'Mark the attack on {t} successful? Everyone in it switches to defense.', failQ:'Mark the attack on {t} not successful?', heldOn:'Held: yes', heldOff:'Held: no', defCount:'{n} defending', audTgt:'Everyone on {t}', audOne:'{n}', audPlayers:'PLAYERS', audFilter:'Filter names', dupMark:'⚠ duplicate', audLeadsGrp:'LEADS', audRallies:'RALLY JOINERS', audGeneral:'GENERAL', marNotOk:'⚠ march not confirmed · watch the game', marNotOkAdm:'⚠ march not confirmed', helpReqBtn:'Request help', helpCancel:'Cancel help', helpWaiting:'Help requested…', helpByLbl:'{n} is helping', helpCallBtn:'HELP: {s} {n} · {t}', helpingBar:'Helping {s} on {t}', helpDone:'Finished helping', helpTaken:'Another admin is already helping.', helpNote:'{n} is helping you', helpRallyWait:'rally not started yet', helpCount:'Your help requests: {n}', msgB3:'Most help requests', suckOne:'{n} sucks the most!', suckTie:'{n} suck!', andWord:' and ', noHelpYet:'Nobody has asked for help yet.', ctlOtherDev:'Control is on your other device', takeHere:'Take control on this device', wakeOk:'The screen will stay on while this page is open. Tap again to turn it off.', changeMode:'↩ group/solo', grpAvail:'available', grpAvailSub:'the admin can pick you for a group', grpPicked:'picked for the group', soloQ:'Solo rally?', soloQSub:'You lead it yourself and leave the group list.', soloYes:'Yes, solo rally', soloNo:'Cancel', backGroup:'↩ group list', pickHint:'Tap leads to pick them for the group:', pickLocked:'Group running. Reset to change the leads.', noAvail:'No leads on this target yet.', startGrp:'START GROUP RALLY', noteSelFirst:'Pick at least one lead first.', youDefNote:'You are now defending {t}. Not defending in game? Tap Back to attack.', notDefQ:'Not defending in game? Tap Back to attack', backAtk:'↩ Back to attack', pickAtk:'Pick a target to attack.', compactBtn:'Compact view', fullBtn:'Full view', errConn:'Error connecting. Please refresh the page.', resetConfirm2:'Leave your current role and symbol? Your name is kept.', keepMarQ:'Keep your march times? In a new battle your base has usually moved.', keepMar:'Keep march times', newMar:'Enter new march times', marKept:'March times kept.', newBattleQ:'Is this a new battle? (Last opened over 24 hours ago.)', newBattleYes:'Yes, new battle', newBattleNo:'No, same battle', vVol:'Volume', rpLbl:'Ratio preset', rpCustom:'Custom', rpSetBtn:'Set', myRatio:'My ratio', rpHdr:'Ratio presets', rpName:'Preset name', rpAdd:'+ Add preset', rpSave:'Save presets', rpSaved:'Ratio presets saved.', rpErr:'Each preset needs a different name and three numbers that add up to 100 (at most 10 presets).', defRatio:'Defense ratio', ovClr:'Use group ratio', rpSet:'Ratio set: {r}', say_ready:'Ready check', sameRatio:'Same ratio for all rallies', leadOwn:'(lead’s own pick)', youTag:'YOU', lateHdr:'SEND NOW · SPEED UP', lateSub:'Your march {m} · lands in {l} · speed up by {s}', say_late:'Send now, speed up', cancelRally:'Cancel rally', cancelQ:'Cancel this rally? Joiners are told it is cancelled.', rallyCancelled:'Rally cancelled', cancelledSub:'Wait for the lead to start again', say_cancelled:'Rally cancelled', verLbl:'Version {v}', verNew:'A new version of the app is out.', verRefresh:'Refresh now', repBtn:'Report problem', repQ:'What went wrong? (optional) The app also saves what your screen showed.', repSent:'Report sent. Thank you.', repFail:'Could not send the report. Please refresh the page.', repHdr:'Problem reports', repNone:'No reports yet.', repCopy:'Copy', repCopyAll:'Copy all', repClear:'Delete all', repClearQ:'Delete all problem reports?', repCopied:'Copied. Paste it to Claude.', repCopyManual:'Copy this text:', ctrRole:'Counter attack', ctrPickSub:'DTF holds Center: defend it, or counter attack from an allied alliance.', defendBtn:'Defend', ctrHdr:'Counter attack', ctrSwQ:'Switched alliance?', ctrSwSub:'Confirm you have switched to the allied alliance in the game.', ctrSwYes:'Yes, I switched', ctrBmQ:'Base moved?', ctrBmSub:'Has your base moved since you switched?', ctrBmNo:'No, same base', ctrBmYes:'Yes, it moved', ctrMarQ:'March to Center', ctrMarSub:'Enter your march time to Center from your new base (m:ss).', ctrMarErr:'Enter a march time such as 0:42.', ctrWaitSub:'March to Center {m} · the admin will tell you when to start', ctrGoT:'START NOW', ctrGoSub:'alert {s} ago', ctrGoTap:'Start your counter rally on Center now, then tap below', ctrStarted:'I started the rally', say_ctrGo:'Start your counter rally now', ctrAbortT:'ABORT', ctrAbortSub:'Disband your counter rally in the game now', say_ctrAbort:'Abort, disband your counter rally', ctrHoldT:'HOLD CENTER', ctrHoldSub:'Stay in Center as defender until DTF marches arrive, then expel all defenders to hand Center back.', ctrHandT:'EXPEL NOW', ctrHandSub:'DTF marches have arrived: expel all defenders to hand Center back.', say_ctrHand:'Hand back Center, expel defenders now', ctrDone:'Done · back to DTF', ctrBack:'Back to DTF', ctrNewMar:'Your base moved: enter your new march times.', ctrAdmHdr:'Counter attack ({n})', ctrNone:'No counter attackers yet.', ctrRallying:'rallying', ctrGoBtn:'START COUNTER', ctrAbBtn:'ABORT COUNTER', ctrHandBtn:'Hand back', ctrAbQ:'Tell the counter attackers to disband their rally?', ctrSent:'Counter attackers alerted.', ctrStGo:'alert sent {s} ago', ctrStAbort:'abort sent {s} ago', ctrStHand:'hand back sent {s} ago', ctrTag:'COUNTER', ctrLand:'lands {s}', ctrEarly:'too early', ctrTight:'tight', ctrGood:'good', ctrLate:'late', ctrOnlyThem:'Only the counter attacker corrects this march.', tdlHdr:'Tower defense lead', tdlPick:'PICK ATTACK', tdlPickSub:'Tap a green attack to claim it, then rush there', tdlBeIn:'be in by · lands in {l}', tdlLands:'lands in · take over as lead defender', tdlDrop:'Drop claim', tdlTaken:'Another leader took that attack.', tdlGone:'The attack on {t} was removed: claim ended.', say_tdlIn:'Be in now', say_tdl:'You are a tower defense lead', tdlYou:'The admin made you a Tower defense lead.', tdlOff:'You are no longer a Tower defense lead.', tdlAdmHdr:'Tower defense leads ({n}/{m})', tdlNoLeads:'No rally leads to pick.', roleTdl:'Tower defense lead', skBtn:'Skin', skHdr:'Skin', skUpload:'Upload skin file', skEdit:'Make my own', skEditClose:'Close editor', skAi:'AI prompt', skDownload:'Download skin file', skDefault:'Default skin', skNow:'Now: {n}', skOffNow:'skins are off for this visit (skin=off)', skRadius:'Corners', skSt_flat:'Flat', skSt_gradient:'Gradient', skSt_bevel:'Metal', skSt_glow:'Glow', skSt_storm:'Storm', skF_system:'Standard font', skF_rounded:'Rounded font', skF_serif:'Serif font', skF_mono:'Typewriter font', skF_condensed:'Narrow font', skWall:'Wallpaper picture', skNoWall:'No wallpaper', skDim:'Darken', skName:'Skin name', skSave:'Save skin', skSaved:'Skin saved on this device.', skLoaded:'Skin "{n}" loaded.', skDefOk:'Default skin (MAD OPS) back on.', sk_bg:'Page', sk_pan:'Panels', sk_bd:'Borders', sk_tx:'Text', sk_mu:'Small text', sk_am:'Accent', skTx:'text', skPan:'panels', skBg:'page', skMu:'small text', skAm:'accent', skErrFile:'That is not a MAD OPS skin file.', skErrColor:'Color "{k}" must look like #12ab34.', skErrWall:'The wallpaper must be a picture.', skErrCon:'Too hard to read: {a} on {b}. Pick colors further apart.', skErrAm:'The accent is too dark for button text. Pick a lighter accent.', skErrSpace:'Not enough space on this device to keep the skin.', skAiHow:'Copy this, replace the part in [brackets] with your idea, and paste it into any AI chat. Save its answer as a .json file and upload it here.', betaTitle:'LIVE BETA', betaSub:'Version {v} · this battle is a live test of new features. Things may break: keep playing, and help us find the problems.', betaNewHdr:'New to try', betaN1:'Counter rally: when DTF holds Center, tap Center → Counter attack.', betaN2:'Tower defense leads: the admin picks the strongest leads to rush from tower to tower.', betaN3:'Ratio presets: every ratio now shows its name (Attack 1, Defense 2, Custom).', betaN4:'SEND NOW · SPEED UP when an attack is too close for a normal send.', betaN5:'Skins: tap Skin to change the look. Default skin at the bottom puts it back.', betaRepHdr:'If something goes wrong', betaR1:'Tap Report problem (under Leave and start fresh) as soon as you can. The app saves what your screen shows.', betaR2:'Write a few words: what you were doing and what you expected, for example "joined VX, no JOIN NOW".', betaR3:'Keep playing. If timers look wrong, follow the leads in chat.', betaR4:'After the battle, tell the admin anything you remember. The admin collects all reports.', betaFoot:'Thank you for helping test MAD OPS.', betaLink:'Beta info', tipNoMore:'Don’t show this again', tip_lead_t:'Rally lead', tip_lead:'You lead attack rallies on this target. You are available for a group rally right away: the admin picks leads and starts the ready check. Choose Solo rally if you will start your own. Under My ratio you can give your rally its own troop ratio.', tip_solo_t:'Solo rally', tip_solo:'You start this rally yourself. Pick a troop ratio, tap START when you start the rally in the game, then type the game’s rally timer to sync. Your joiners follow your timers. Cancel rally stops it and tells them.', tip_join_t:'Joining a rally', tip_join:'You follow one rally lead. Rally colors on the map: green = not marching yet, flashing yellow = marching in 20 s, flashing red = in 5 s, red = marching. When your lead starts, JOIN NOW appears with the troop ratio: join in the game.', tip_def_t:'Defending', tip_def:'When the admin syncs an incoming attack, you get a send timer based on your own march, so your reinforcements land just after it. If an attack is too close for a normal send, you get SEND NOW · SPEED UP with how much to speed up.', tip_ctr_t:'Counter attack', tip_ctr:'You attack Center from an allied alliance so the counter lands just after a strong enemy attack, on weakened enemy defenders. The admin tells you when to start. If it works, you hold Center until DTF’s marches arrive, then hand it back.', tip_tdl_t:'Tower defense lead', tip_tdl:'You rush from tower to tower to take over as lead defender before each attack lands. Green attacks are the next ones to cover. Claiming one locks it for the other leader. Be in by is 10 s before landing.', tip_ratio_t:'Ratio presets', tip_ratio:'Pick a named troop ratio set by the admin before the fight, or Custom to type your own. Everyone in the rally sees the name with the numbers. Tapping the numbers switches to Custom.', tip_skin_t:'Skins', tip_skin:'Change how the app looks on this device: pick a built-in skin, make your own, or load a skin file a friend sent. Rally and alert colors never change. Default skin at the bottom of the page always puts the normal look back.', tip_compact_t:'Compact view', tip_compact:'Shows only the timer box with big buttons, for a phone’s floating window or split screen next to the game. Full view brings the page back.', tip_pop_t:'Pop out', tip_pop:'Puts the timer box in a small window that floats over the game. On a PC the buttons work in it; on a phone it is a picture of the box.', tip_report_t:'Report problem', tip_report:'Saves what your screen shows and what the app was doing, with your note, for the admin. Use it the moment something looks wrong, then keep playing.', tip_help_t:'Request help', tip_help:'Asks the admins for help with your rally. The first admin to answer can sync and adjust your timers for you.', tip_admAtk_t:'Group rallies', tip_admAtk:'Every lead not on solo is listed. Tap the leads you want, set their order and ratio, then START GROUP RALLY. The leads tap READY and the countdown starts by itself.', tip_admDef_t:'Incoming attacks', tip_admDef:'Sync each enemy attack from the game timer. Defenders on this target get send timers from their own marches. A new enemy’s march is a 30 s guess until you adjust it live. Set the defense ratio here too.', tip_admCtr_t:'Counter attack', tip_admCtr:'Counter attackers are listed here. Tap START COUNTER when a strong enemy attack appears, ABORT COUNTER to call it off during the gather, and Hand back once DTF’s marches reach Center. Sync their rally from the blue COUNTER chip.', tip_admTdl_t:'Tower defense leads', tip_admTdl:'Pick up to 2 strong rally leads to rush between towers. They see the next attacks to cover and claim them, one per tower.', tip_admRp_t:'Ratio presets', tip_admRp:'Name and set the troop ratios before the fight. Everyone picks them from a list, so less typing in battle.', tip_admRep_t:'Problem reports', tip_admRep:'Reports players sent during the battle, with what their screen showed. Copy all and paste it to Claude.', betaAgree:'By using MAD OPS you agree not to share it with anyone outside DTF or ROS.', betaOk:'I agree', refHdr:'Shared links', refLine:'brought {k}:', refNone:'Nobody has joined from a shared link yet.', refNoTag:'Opened without a link tag: {k}', refUnknown:'unknown link {c}', shareNeedName:'Save your in-game name first.', shareText:'MAD OPS: DTF/ROS rally timer. Do not share outside DTF or ROS.', shareDone:'Shared. DTF or ROS teammates only, please.', shareCopied:'Link copied. Send it to a DTF or ROS teammate only.', nbBtn:'NEW BATTLE RESET', nbQ:'Type RESET to start a new battle. Everyone goes back to entering march times (names are kept). All attacks, rallies, held targets, saved enemies, counters and tower claims are cleared.', nbNo:'Not reset: you did not type RESET.', nbSent:'New battle reset sent to everyone.', nbNeedCtl:'Only the admin in control can reset.', nbDone:'New battle: everything was reset. Enter your march times.', shareBtn:'Copy link for a teammate', shareFail:'Could not copy the link. Please try again.', notAdmin:'This account is not on the admin list. Ask the owner to add it in the Admins section.', notAdminErr:'Signed in, but this account is not on the admin list. Ask the owner to add it.', tooMany:'Too many attempts. Wait a while (up to an hour), then try again.', admHdr:'Admins', admHow:'Create the account in Firebase Authentication (email and password), then add the email here. Owners (★) can change this list.', admFixed:'Admins built into the security rules are not shown here.', admOwner:'owner', admOwnerTip:'Owners can add and remove admins', admAdd:'Add admin', admBad:'Enter a full email address.', admHave:'That email is already an admin.', admRmQ:'Remove {e} from the admins?', admSaved:'Admins list saved.', admFail:'Could not save. Only owners can change the admins list (publish the new rules first).', tutLater:'The tutorial returns in a later update.', helpBtn:'? Help', helpTitle:'MAD OPS HELP', helpClose:'Close', helpWhatH:'What is MAD OPS?', helpWhat1:'MAD OPS is DTF’s battle timer for the Supreme Prison and SvS fights. You still play in the game: MAD OPS tells you exactly when to start, join or send, so everyone’s marches land together.', helpWhat2:'The goal: no more counting down in chat. The admin runs the fight from one screen, every phone’s clock is matched to it, and your screen only shows what you need to do next. That way DTF hits harder and defends better.', helpSyncH:'What it keeps in sync', helpSync1:'Rallies: each rally lead gets their own start time, worked out from their march, so rallies from different bases hit the target together.', helpSync2:'Joiners: you are told the moment your lead’s rally opens, so it fills up in time.', helpSync3:'Defense: your send time is worked out from your own march time, so your reinforcements land right after each enemy hit.', helpSync4:'Calls: the admin’s messages and voice calls reach everyone at the same moment.', helpBetaH:'What is a live beta?', helpBeta1:'A beta is a test version. This is a real fight, but some features in the app are being used in battle for the first time, so a few things may not work perfectly.', helpBeta2:'If something looks wrong, keep playing in the game and follow the leads in chat. When you have a moment, tap Report problem (next to Leave and start fresh) so the admin can fix it.', helpStartH:'Getting started', helpS1:'At the top of the screen, pick your language and tap the sound button until it says Sound on, so you hear the calls.', helpS2:'Enter your in-game name and your march time to each of the five targets as minutes:seconds (for example 0:42), then tap Save. The game shows the march time when you send troops to a target.', helpS3:'On the map, tap the target you are told to go to.', helpS4:'Pick your role. If DTF already holds that target, you are set to defend it.', helpBoxH:'Watch the big box', helpBox:'The big box at the top always tells you what to do right now. STANDBY means wait. When it turns green, act in the game straight away.', helpRolesH:'Simple roles', helpJoin:'Joiner (JOIN): tap the symbol of the rally lead you will join, then wait. When the box turns green and says JOIN NOW, join that rally in the game with the troop ratio it shows.', helpDef:'Defender: you reinforce a target DTF holds. When the timer reaches zero and the box says SEND, send your reinforcements in the game. SEND NOW · SPEED UP means send at once and speed up your march.', helpLead:'Rally lead (LEAD): for experienced players. A short tip explains it the first time you choose it.', helpBtnsH:'Handy buttons', helpB1:'Pop out overlay: a small timer window over the game.', helpB2:'Keep screen awake: stops your screen from turning off.', helpB3:'Compact view: only the timer box, for split screen next to the game.', helpB4:'Leave and start fresh: drops your role so you can pick again. Your name is kept, and it asks whether to keep your march times.', helpAsk:'Still not sure? Ask in alliance chat. When in doubt, follow the leads in the game.', helpTips:'Show feature tips again', helpTipsOk:'Tips will show again as you use each feature.', betaHelp:'New to MAD OPS? Tap ? Help at the top of the screen for a quick guide.',
 chooseFile:'Choose file', fileTooBig:'File too large. Use a clip under 700 KB.', fileBad:'That file could not be played. Use mp3, m4a or wav.', fileSaving:'Saving…', builtIn:'built in', clipHint:'Choose a short audio file for each voice button. The countdown voice is built into the app.',
 updBtn:'Update', noteEnemyName:'Type or pick an enemy name first.', enemySaved:'{n} saved at {t}', msgHdr:'MESSAGES', msgTo:'To', audAll:'Everyone', audLeads:'All rally leads', audJoiners:'All joiners', audLead:'Lead {s}', audRally:'Joiners of {s}', msgPh:'Type a message', sendBtn:'Send', msgB1:'Prepare to start your rally', msgB2:'Prepare to defend', msgSent:'Sent to {a}: {m}', msgEmpty:'Type a message first.', msgClose:'Close message', editPresets:'Edit presets', doneEdit:'Done editing', savePresets:'Save buttons', presetsSaved:'Buttons saved', textBtns:'TEXT BUTTONS', voiceBtns:'VOICE BUTTONS', cdClips:'COUNTDOWN VOICE', labelPh:'Label', textPh:'Message', recBtn:'Record', stopBtn:'Stop', playBtn:'Play', delBtn:'Delete', noClip:'no recording', hasClip:'recorded', voiceN:'Voice {n}', micErr:'Microphone not available: {m}', clipSaved:'Recording saved', clipEmpty:'Nothing was recorded. Try again.', clipDelQ:'Delete this recording?', voiceNoClip:'Record this first.', voiceDev:'Voice: device', voiceRec:'Voice: recorded', voiceNone:'No recordings yet. The device voice is used.', voiceNeedSound:'Turn on sound to hear recordings.', voiceSent:'Voice sent to {a}: {m}', voiceHint:'Voice buttons play only for players who chose the recorded voice.',
 tutBtn:'Tutorial', tutNote:'Practice only. Nothing is sent to your team.', tutMenu:'Choose a practice', tutLeadBtn:'Rally Lead', tutJoinBtn:'Rally Joiner', tutDefBtn:'Defense', tutStepN:'Step {n} of {m}', tutNext:'Next', tutExit:'Exit tutorial', tutOpen:'Ready: open the pop-out', tutCont:'Continue', tutAgain:'Practice again', tutToMenu:'Menu', tutSound:'Turn on sound', tutAdmin:'Log out of admin before starting the tutorial.', tutTeam:'Team sends', tutSwitch:'Switch to your game', tutStartIn:'starting soon', tutRetLbl:'Well done!', tutRetTime:'GO BACK', tutRetSub:'return to the tutorial', tutRetSay:'Well done. Return to the tutorial.', sL1:'You are Rally Lead VX. Two teammates, AB and KT, are simulated. The tutorial plays the admin.', sL2:'Tap LEAD in the box below.', sL3:'Your symbol and march time are pre-filled (VX, 0:50). Check them and tap OK.', sL4:'WAIT: the admin has not confirmed the leaders yet. Tap Next to let the admin confirm.', sL5:'STANDBY: the leaders are locked in. Tap Next to start the ready check.', sL6:'Ready check! Tap the green READY button in the box below.', sL7:'Everyone is ready. The admin starts the countdown next. Tap the button, then switch to your game and watch the floating window.', sRun:'Switch to your game now. The floating window counts down 3, 2, 1, then shows your launch timer and flashes SEND. It will tell you when to come back. If it cannot open, watch the box below.', sL9:'That was a full rally. AB launched first so all rallies land together. On a phone, tap READY inside the app before you pop out.', sJ1:'You are a rally joiner. Four leaders (AB, KT, QZ, VX) are simulated. The tutorial plays the admin and the leaders.', sJ2:'Tap JOIN in the box below.', sJ3:'WAIT: the admin has not confirmed the leaders yet. Tap Next to let the admin confirm.', sJ4:'Pick your rally: tap the symbol of the leader you will join.', sJ5:'Enter your march time (pre-filled 0:41) and tap OK.', sJ6:'STANDBY: nothing to tap. Tap Next to start the ready check.', sJ7:'The countdown is about to start. Tap the button, switch to your game and watch. When your leader launches, the window turns green: RALLY STARTED, JOIN NOW.', sJ9:'Well done. When you see RALLY STARTED, join that rally in the game.', sD1:'The same team (AB, KT, QZ, VX) defends with you. The admin switched to Defense mode.', sD2:'Type your march to the center, 0:36, and tap OK.', sD3:'One attack is coming. Everyone sends so reinforcements land 0.4 s after the hit. Tap the button, switch to your game, and send when the timer reaches zero.', sD6:'Now three attacks arrive close together. The small number is how many sends you have left. A red glow means two attacks land within 1 second of each other, so you send twice almost at once. Each timer is replaced by the next one by itself.', sD9:'You can defend now. If you start late, speed up your march in the game. After the last send, check your troop ratios.',
 ginPh:'In-game name', nameNeeded:'Enter your in-game name', ctlYou:'You have control', ctlView:'View only · {n} has control', ctlNone:'No one has control yet', adminsHere:'Admins here', reqBtn:'Request control', reqSent:'Request sent', reqQueue:'Position {p} in line', reqCancel:'Cancel', reqRow:'{n} requests control', xferBtn:'Transfer', declBtn:'Decline', ctlGained:'You now have control', ctlLost:'Control moved to {n}', ctlDeclined:'Your request was declined', ctlExpired:'Your request expired', ctlNoReq:'That request is gone', viewNote:'Only the admin with control can change these. You can still use the LEAD or JOIN box.',
 emailPh:'Admin email', badLogin:'Wrong email or password', errEmailOff:'Turn on Email/Password sign-in in Firebase Authentication.',
 back:'↩', language:'Language', live:'Live', offline:'Offline', connecting:'Connecting…', room:'Room', clockPill:'clock ±{n}ms', clockNone:'clock --',
 soundOff:'Sound off', soundOn:'Sound on', popBtn:'Pop out overlay', wakeBtn:'Keep screen awake', wakeOn:'Screen kept awake', popPreview:'Pop-out preview', adminLink:'Admin',
 resetMe:'↺ Leave and start fresh', resetConfirm:'Leave and clear your role, symbol and march?', marchTarget:'March to target', marchCenter:'March to center',
 roleLead:'Rally lead {sym}', roleJoin:'Rally joiner', noRole:'No role yet', adminSuffix:' · admin',
 errRules:'Firestore blocked the request. Check the security rules.', errAuth:'Turn on Anonymous sign-in in Firebase Authentication.', errGeneric:'Error: {m}',
 noteMarchFirst:'Enter a march time first.', noteConfirmFirst:'Confirm leaders first.', noteNoLeaders:'No leaders yet.', noteTypeTimer:'Type the timer shown in the game.',
 noteLimit:'Six attacks is the limit. Clear one first.', noteTaken:'Another admin is active.', noteTookOver:'Another admin took over.',
 noteWakeNo:'Keep awake is not supported here.', noteWakeRef:'Keep awake refused: {m}', notePopRef:'Pop-out refused: {m}', notePopTap:'Pop-out refused: {m} Tap again.', notePopNone:'This browser has no pop-out.',
 chooseRole:'Choose your role', lead:'LEAD', join:'JOIN', leadEntry:'Rally lead · symbol + march', symErr:'Symbol must be 2 characters', marErr:'Enter your march time', symTaken:'Symbol taken',
 ok:'OK', editBtn:'↩ edit', waitingAdmin:'Waiting for admin', standingBy:'Standing by', wait:'WAIT', standby:'STANDBY', readyCheck:'Ready check', ready:'READY', readyDone:'READY ✓',
 waitOthers:'waiting for the others', notInOp:'Not in this op', missed:'MISSED', waitNext:'wait for the next one', cdLabel:'Rally timer starting in', launchIn:'{sym} launch in',
 send:'SEND', rallyRunning:'Rally running', launched:'LAUNCHED', doneLbl:'Done', DONE:'DONE', waitAdminSub:'wait for the admin', joinWait:'Waiting for leaders', pickRally:'Pick your rally',
 joiningMarch:'Joining {sym} · your march', joining:'Joining {sym}', rallyNot:'rally not started yet', rallyStarted:'RALLY STARTED', joinNow:'JOIN NOW', readyQ:'READY?',
 marchSub:'march {t}', changeBtn:'↩ change', cdSub:'rally timer starting', say_send:'Send', say_join:'Rally started. Join now.', say_sound:'Sound is on',
 centerMarch:'center march {t}', defense:'Defense', sendIn:'{l} · send in', thenGap:' · then {s}s', allSent:'All sent', checkRatios:'Check troop ratios', editMarch:'✎ march',
 modeChange:'MODE CHANGE', modeDef:'DEFENSE', modeAtk:'ATTACK',
 admin:'ADMIN', logout:'Log out', tabAtk:'1 · RALLY ATTACK', tabDef:'2 · DEFENSE', modeConfirm:'Switch to {m} mode? All players get a notice. Roles and marches are kept.',
 modeNameAtk:'RALLY ATTACK', modeNameDef:'DEFENSE', pw:'Admin password', login:'Log in', wrongPw:'Wrong password',
 leadersJoiners:'Leaders {a} · Joiners {b}', confirmLeaders:'CONFIRM LEADERS', leadersLocked:'LEADERS LOCKED',
 hitOrder:'HIT ORDER · FIRST HIT ON TOP', joinedN:'{n} joined', noLeadersMsg:'No leaders yet. Share the link and ask leaders to pick LEAD.', leadBuffer:'Lead buffer',
 readyCheckBtn:'READY CHECK', startNow:'START NOW', reset:'RESET', resetOpConfirm:'Reset the op? Leaders and joiners go back and re-enter.',
 offsetsNote:'Offsets: 0.1 s apart, last rally +0.4 s. Change any with − and +.', startsT:'starts {t}', tMinus:'T−{t}', launchedLbl:'launched',
 stStarting:'Starting in {n}', stRunning:'Rally op running', stReadyWait:'Ready check: waiting for leaders', stConfirmed:'Leaders confirmed', stCollecting:'Collecting leaders', moveUp:'Move up', moveDown:'Move down',
 known:'KNOWN ENEMIES · TAP TO FILL', knownNone:'None yet. New names start at 0:30.', newAttack:'NEW ATTACK', namePh:'NAME', marchWord:'march', rally5:'RALLY 5:00', alreadyMarching:'ALREADY MARCHING',
 timerInGame:'timer in game', syncBtn:'SYNC', resyncBtn:'RESYNC', timeline:'TIMELINE', noAttacks:'No incoming attacks.', landPlus:'land +', gapLbl:'gap {a} → {b} {s} s',
 clearAll:'Clear all', clearAllConfirm:'Clear all incoming attacks?', rallyW:'RALLY', marchW:'MARCH', landedW:'LANDED', removeBtn:'REMOVE',
 resetDef:'RESET DEFENSE', resetDefConfirm:'Reset defense? This clears every attack and the sync bar. Known enemies are kept.', forgetAll:'Forget all', forgetAllConfirm:'Forget all known enemies?', forgetOne:'Forget {n}'
},
fr: {
 chooseFile:'Choisir un fichier', fileTooBig:'Fichier trop volumineux. Utilisez un extrait de moins de 700 Ko.', fileBad:'Ce fichier ne peut pas être lu. Utilisez mp3, m4a ou wav.', fileSaving:'Enregistrement…', builtIn:'intégré', clipHint:'Choisissez un court fichier audio pour chaque bouton vocal. La voix du compte à rebours est intégrée à l’application.',
 updBtn:'Mettre à jour', noteEnemyName:'Saisissez ou choisissez d’abord un nom d’ennemi.', enemySaved:'{n} enregistré à {t}', msgHdr:'MESSAGES', msgTo:'À', audAll:'Tout le monde', audLeads:'Tous les chefs de rallye', audJoiners:'Tous les participants', audLead:'Chef {s}', audRally:'Participants de {s}', msgPh:'Saisissez un message', sendBtn:'Envoyer', msgB1:'Préparez-vous à lancer votre rallye', msgB2:'Préparez-vous à défendre', msgSent:'Envoyé à {a} : {m}', msgEmpty:'Saisissez d’abord un message.', msgClose:'Fermer le message', editPresets:'Modifier les boutons', doneEdit:'Terminer', savePresets:'Enregistrer les boutons', presetsSaved:'Boutons enregistrés', textBtns:'BOUTONS TEXTE', voiceBtns:'BOUTONS VOCAUX', cdClips:'VOIX DU COMPTE À REBOURS', labelPh:'Libellé', textPh:'Message', recBtn:'Enregistrer', stopBtn:'Arrêter', playBtn:'Écouter', delBtn:'Supprimer', noClip:'aucun enregistrement', hasClip:'enregistré', voiceN:'Voix {n}', micErr:'Microphone indisponible : {m}', clipSaved:'Enregistrement sauvegardé', clipEmpty:'Rien n’a été enregistré. Réessayez.', clipDelQ:'Supprimer cet enregistrement ?', voiceNoClip:'Enregistrez-le d’abord.', voiceDev:'Voix : appareil', voiceRec:'Voix : enregistrée', voiceNone:'Aucun enregistrement pour l’instant. La voix de l’appareil est utilisée.', voiceNeedSound:'Activez le son pour entendre les enregistrements.', voiceSent:'Voix envoyée à {a} : {m}', voiceHint:'Les boutons vocaux ne sont entendus que par les joueurs qui ont choisi la voix enregistrée.',
 tutBtn:'Tutoriel', tutNote:'Entraînement uniquement. Rien n’est envoyé à votre équipe.', tutMenu:'Choisissez un entraînement', tutLeadBtn:'Chef de rallye', tutJoinBtn:'Participant', tutDefBtn:'Défense', tutStepN:'Étape {n} sur {m}', tutNext:'Suivant', tutExit:'Quitter le tutoriel', tutOpen:'Prêt : ouvrir la surimpression', tutCont:'Continuer', tutAgain:'Recommencer', tutToMenu:'Menu', tutSound:'Activer le son', tutAdmin:'Déconnectez-vous du mode admin avant de lancer le tutoriel.', tutTeam:'Envois de l’équipe', tutSwitch:'Passez à votre jeu', tutStartIn:'démarrage imminent', tutRetLbl:'Bravo !', tutRetTime:'RETOUR', tutRetSub:'revenez au tutoriel', tutRetSay:'Bravo. Revenez au tutoriel.', sL1:'Vous êtes le chef de rallye VX. Deux coéquipiers, AB et KT, sont simulés. Le tutoriel joue l’admin.', sL2:'Appuyez sur CHEF dans la case ci-dessous.', sL3:'Votre symbole et votre temps de marche sont pré-remplis (VX, 0:50). Vérifiez et appuyez sur OK.', sL4:'ATTENDEZ : l’admin n’a pas encore confirmé les chefs. Appuyez sur Suivant pour qu’il confirme.', sL5:'EN VEILLE : les chefs sont verrouillés. Appuyez sur Suivant pour lancer la vérification.', sL6:'Vérification ! Appuyez sur le bouton vert PRÊT dans la case ci-dessous.', sL7:'Tout le monde est prêt. L’admin lance ensuite le compte à rebours. Appuyez sur le bouton, passez à votre jeu et regardez la fenêtre flottante.', sRun:'Passez à votre jeu maintenant. La fenêtre flottante compte 3, 2, 1, puis affiche votre minuteur de lancement et clignote ENVOI. Elle vous dira quand revenir. Si elle ne s’ouvre pas, regardez la case ci-dessous.', sL9:'C’était un rallye complet. AB a lancé en premier pour que tous les rallyes arrivent ensemble. Sur téléphone, appuyez sur PRÊT dans l’application avant d’ouvrir la surimpression.', sJ1:'Vous êtes participant. Quatre chefs (AB, KT, QZ, VX) sont simulés. Le tutoriel joue l’admin et les chefs.', sJ2:'Appuyez sur REJOINDRE dans la case ci-dessous.', sJ3:'ATTENDEZ : l’admin n’a pas encore confirmé les chefs. Appuyez sur Suivant pour qu’il confirme.', sJ4:'Choisissez votre rallye : appuyez sur le symbole du chef que vous rejoignez.', sJ5:'Saisissez votre temps de marche (pré-rempli 0:41) et appuyez sur OK.', sJ6:'EN VEILLE : rien à appuyer. Appuyez sur Suivant pour lancer la vérification.', sJ7:'Le compte à rebours va commencer. Appuyez sur le bouton, passez à votre jeu et regardez. Quand votre chef lance, la fenêtre devient verte : RALLYE LANCÉ, REJOIGNEZ !', sJ9:'Bien joué. Quand vous voyez RALLYE LANCÉ, rejoignez ce rallye dans le jeu.', sD1:'La même équipe (AB, KT, QZ, VX) défend avec vous. L’admin est passé en mode Défense.', sD2:'Saisissez votre temps de marche vers le centre, 0:36, et appuyez sur OK.', sD3:'Une attaque arrive. Tout le monde envoie pour que les renforts arrivent 0,4 s après l’impact. Appuyez sur le bouton, passez à votre jeu et envoyez quand le minuteur atteint zéro.', sD6:'Trois attaques arrivent maintenant très rapprochées. Le petit nombre indique combien d’envois il vous reste. Une lueur rouge signifie que deux attaques arrivent à moins d’1 seconde l’une de l’autre : vous envoyez deux fois presque en même temps. Chaque minuteur est remplacé automatiquement par le suivant.', sD9:'Vous savez défendre. Si vous partez en retard, accélérez votre marche dans le jeu. Après le dernier envoi, vérifiez vos ratios de troupes.',
 ginPh:'Nom en jeu', nameNeeded:'Saisissez votre nom en jeu', ctlYou:'Vous avez le contrôle', ctlView:'Lecture seule · {n} a le contrôle', ctlNone:'Personne n’a encore le contrôle', adminsHere:'Admins présents', reqBtn:'Demander le contrôle', reqSent:'Demande envoyée', reqQueue:'Position {p} dans la file', reqCancel:'Annuler', reqRow:'{n} demande le contrôle', xferBtn:'Transférer', declBtn:'Refuser', ctlGained:'Vous avez maintenant le contrôle', ctlLost:'Le contrôle est passé à {n}', ctlDeclined:'Votre demande a été refusée', ctlExpired:'Votre demande a expiré', ctlNoReq:'Cette demande n’existe plus', viewNote:'Seul l’admin qui a le contrôle peut modifier ces réglages. Vous pouvez quand même utiliser la case CHEF ou REJOINDRE.',
 emailPh:'E-mail admin', badLogin:'E-mail ou mot de passe incorrect', errEmailOff:'Activez la connexion par e-mail/mot de passe dans Firebase Authentication.',
 back:'↩', language:'Langue', live:'En ligne', offline:'Hors ligne', connecting:'Connexion…', room:'Salle', clockPill:'horloge ±{n} ms', clockNone:'horloge --',
 soundOff:'Son coupé', soundOn:'Son activé', popBtn:'Afficher en surimpression', wakeBtn:'Garder l’écran allumé', wakeOn:'Écran maintenu allumé', popPreview:'Aperçu de la surimpression', adminLink:'Admin',
 resetMe:'↺ Quitter et recommencer', resetConfirm:'Quitter et effacer votre rôle, symbole et temps de marche ?', marchTarget:'Temps de marche vers la cible', marchCenter:'Temps de marche vers le centre',
 roleLead:'Chef de rallye {sym}', roleJoin:'Participant au rallye', noRole:'Pas encore de rôle', adminSuffix:' · admin',
 errRules:'Firestore a bloqué la requête. Vérifiez les règles de sécurité.', errAuth:'Activez la connexion anonyme dans Firebase Authentication.', errGeneric:'Erreur : {m}',
 noteMarchFirst:'Saisissez d’abord un temps de marche.', noteConfirmFirst:'Confirmez d’abord les chefs.', noteNoLeaders:'Aucun chef pour l’instant.', noteTypeTimer:'Saisissez le minuteur affiché dans le jeu.',
 noteLimit:'Six attaques maximum. Supprimez-en une d’abord.', noteTaken:'Un autre admin est actif.', noteTookOver:'Un autre admin a pris la main.',
 noteWakeNo:'Maintien de l’écran non pris en charge ici.', noteWakeRef:'Maintien de l’écran refusé : {m}', notePopRef:'Surimpression refusée : {m}', notePopTap:'Surimpression refusée : {m} Appuyez à nouveau.', notePopNone:'Ce navigateur ne gère pas la surimpression.',
 chooseRole:'Choisissez votre rôle', lead:'CHEF', join:'REJOINDRE', leadEntry:'Chef de rallye · symbole + marche', symErr:'Le symbole doit faire 2 caractères', marErr:'Saisissez votre temps de marche', symTaken:'Symbole déjà pris',
 ok:'OK', editBtn:'↩ modifier', waitingAdmin:'En attente de l’admin', standingBy:'En attente', wait:'ATTENDEZ', standby:'EN VEILLE', readyCheck:'Vérification', ready:'PRÊT', readyDone:'PRÊT ✓',
 waitOthers:'en attente des autres', notInOp:'Hors de cette opération', missed:'RATÉ', waitNext:'attendez la prochaine', cdLabel:'Le rallye démarre dans', launchIn:'{sym} lancement dans',
 send:'ENVOI', rallyRunning:'Rallye en cours', launched:'LANCÉ', doneLbl:'Terminé', DONE:'FINI', waitAdminSub:'attendez l’admin', joinWait:'En attente des chefs', pickRally:'Choisissez votre rallye',
 joiningMarch:'Rejoint {sym} · votre marche', joining:'Rejoint {sym}', rallyNot:'le rallye n’a pas démarré', rallyStarted:'RALLYE LANCÉ', joinNow:'REJOIGNEZ !', readyQ:'PRÊT ?',
 marchSub:'marche {t}', changeBtn:'↩ changer', cdSub:'le rallye démarre', say_send:'Envoyez', say_join:'Rallye lancé. Rejoignez maintenant.', say_sound:'Le son est activé',
 centerMarch:'marche centre {t}', defense:'Défense', sendIn:'{l} · envoi dans', thenGap:' · puis {s} s', allSent:'Tout envoyé', checkRatios:'Vérifiez les ratios de troupes', editMarch:'✎ marche',
 modeChange:'CHANGEMENT DE MODE', modeDef:'DÉFENSE', modeAtk:'ATTAQUE',
 admin:'ADMIN', logout:'Déconnexion', tabAtk:'1 · ATTAQUE DE RALLYE', tabDef:'2 · DÉFENSE', modeConfirm:'Passer en mode {m} ? Tous les joueurs seront prévenus. Les rôles et marches sont conservés.',
 modeNameAtk:'ATTAQUE DE RALLYE', modeNameDef:'DÉFENSE', pw:'Mot de passe admin', login:'Connexion', wrongPw:'Mot de passe incorrect',
 leadersJoiners:'Chefs {a} · Participants {b}', confirmLeaders:'CONFIRMER LES CHEFS', leadersLocked:'CHEFS VERROUILLÉS',
 hitOrder:'ORDRE D’IMPACT · PREMIER IMPACT EN HAUT', joinedN:'{n} inscrits', noLeadersMsg:'Aucun chef pour l’instant. Partagez le lien et demandez aux chefs de choisir CHEF.', leadBuffer:'Marge de lancement',
 readyCheckBtn:'VÉRIFICATION', startNow:'DÉMARRER', reset:'RÉINITIALISER', resetOpConfirm:'Réinitialiser l’opération ? Chefs et participants repartent de zéro.',
 offsetsNote:'Décalages : 0,1 s entre rallyes, dernier rallye +0,4 s. Modifiez avec − et +.', startsT:'départ {t}', tMinus:'T−{t}', launchedLbl:'lancé',
 stStarting:'Démarrage dans {n}', stRunning:'Opération en cours', stReadyWait:'Vérification : en attente des chefs', stConfirmed:'Chefs confirmés', stCollecting:'Collecte des chefs', moveUp:'Monter', moveDown:'Descendre',
 known:'ENNEMIS CONNUS · APPUYEZ POUR REMPLIR', knownNone:'Aucun pour l’instant. Les nouveaux noms démarrent à 0:30.', newAttack:'NOUVELLE ATTAQUE', namePh:'NOM', marchWord:'marche', rally5:'RALLYE 5:00', alreadyMarching:'DÉJÀ EN MARCHE',
 timerInGame:'minuteur du jeu', syncBtn:'SYNCHRO', resyncBtn:'RESYNCHRO', timeline:'CHRONOLOGIE', noAttacks:'Aucune attaque entrante.', landPlus:'impact +', gapLbl:'écart {a} → {b} {s} s',
 clearAll:'Tout effacer', clearAllConfirm:'Effacer toutes les attaques entrantes ?', rallyW:'RALLYE', marchW:'MARCHE', landedW:'ARRIVÉ', removeBtn:'SUPPRIMER',
 resetDef:'RÉINITIALISER LA DÉFENSE', resetDefConfirm:'Réinitialiser la défense ? Cela efface toutes les attaques et la barre de synchro. Les ennemis connus sont conservés.', forgetAll:'Tout oublier', forgetAllConfirm:'Oublier tous les ennemis connus ?', forgetOne:'Oublier {n}',
 profHdr:'VOTRE PROFIL', namePh2:'Nom en jeu', nameReq:'Entrez votre nom en jeu.', marHdr:'Temps de marche vers chaque cible', marReq:'Entrez les cinq temps de marche.', tC:'Centre', tN:'Nord', tS:'Sud', tE:'Est', tW:'Ouest', saveProf:'Enregistrer', editProf:'Modifier le profil', profSaved:'Profil enregistré', pickTarget:'Choisissez une cible sur la carte', mapHdr:'CIBLES', defBadge:'DÉF', chooseAct:'{t} · choisissez votre rôle', defendAnyway:'Défendre quand même', leave:'↺ Quitter cette cible', meLine:'{n} · {t} · {r}', meNone:'{n} · aucune cible', roleLeadSym:'chef {s}', roleJoinOf:'rejoint {s}', roleDef:'en défense', joinedList:'Ont rejoint : {n}', nobodyJoined:'Personne n’a encore rejoint', symEntry:'{t} · votre symbole de 2 lettres', groupBtn:'RALLYE DE GROUPE', soloBtn:'RALLYE SOLO', chooseMode:'{t} · {s} · groupe ou solo ?', unregister:'Se désinscrire', grpNotCalled:'En attente du groupe de l’admin', grpReset:'Le groupe a été réinitialisé', rejoin:'Rejoindre le groupe', soloRatio:'{t} · {s} · ratio de troupes', startBtn:'DÉPART', ratioErr:'Entrez un ratio de troupes qui fait 100.', ratioPh:'Porte-boucliers/Bombardiers/Tireurs', troops:'Troupes {r}', gathering:'{t} · {s} rassemblement', gatheringEst:'{t} · {s} rassemblement (est.)', syncGather:'Synchro', gatherPh:'minuteur', syncedOk:'Synchronisé', estTag:'est.', prepReinforce:'Préparez les renforts', verifying:'Vérification du succès', winBtn:'Attaque réussie', failBtn:'Attaque échouée', say_reinforce:'Préparez les renforts', say_verify:'Vérification du succès', say_disband:'Rallye dissous', say_defense:'Passage en défense', pickLead:'{t} · choisissez un rallye', noLeadsHere:'Pas encore de chef de rallye sur {t}', joiningSym:'{t} · rejoint {s}', disbanded:'Rallye dissous', pickAgain:'choisissez un autre rallye', defending:'{t} · en défense', noIncoming:'aucune attaque en approche', nowDef:'{t} est maintenant en défense. Si vous ne défendez pas, choisissez un autre rôle.', youDef:'Vous défendez maintenant {t}.', mgTarget:'GÉRER LA CIBLE', myTargetBtn:'Ma cible', subAtk:'Attaque', subDef:'Défense', grpHdr:'RALLYE DE GROUPE', callGroup:'Appeler le groupe', endGroup:'Terminer le groupe', endGroupQ:'Terminer le groupe sur {t} ? Les chefs choisissent à nouveau groupe ou solo.', setRatio:'Valider', ralliesHdr:'RALLYES SUR {t}', noRallies:'Aucun rallye en cours.', soloTag:'solo', groupTag:'groupe', ratioOv:'ratio', phGather:'Rassemblement {x}', phGatherEst:'Rassemblement {x} (est.)', phMarch:'En marche {x}', phVerify:'Vérification', winQ:'Marquer l’attaque sur {t} comme réussie ? Tous ses participants passent en défense.', failQ:'Marquer l’attaque sur {t} comme échouée ?', heldOn:'Tenue : oui', heldOff:'Tenue : non', defCount:'{n} en défense', audTgt:'Tous sur {t}', audOne:'{n}', audPlayers:'JOUEURS', audFilter:'Filtrer les noms', dupMark:'⚠ doublon', audLeadsGrp:'CHEFS', audRallies:'MEMBRES DES RALLYES', audGeneral:'GÉNÉRAL', marNotOk:'⚠ marche non confirmée · surveillez le jeu', marNotOkAdm:'⚠ marche non confirmée', helpReqBtn:'Demander de l’aide', helpCancel:'Annuler l’aide', helpWaiting:'Aide demandée…', helpByLbl:'{n} vous aide', helpCallBtn:'AIDE : {s} {n} · {t}', helpingBar:'Aide à {s} sur {t}', helpDone:'Aide terminée', helpTaken:'Un autre admin aide déjà.', helpNote:'{n} vous aide', helpRallyWait:'rallye pas encore lancé', helpCount:'Vos demandes d’aide : {n}', msgB3:'Le plus de demandes d’aide', suckOne:'{n} est le plus nul !', suckTie:'{n} sont nuls !', andWord:' et ', noHelpYet:'Personne n’a encore demandé d’aide.', ctlOtherDev:'Le contrôle est sur votre autre appareil', takeHere:'Prendre le contrôle sur cet appareil', wakeOk:'L’écran restera allumé tant que cette page est ouverte. Touchez à nouveau pour désactiver.', changeMode:'↩ groupe/solo', grpAvail:'disponible', grpAvailSub:'l’admin peut vous choisir pour un groupe', grpPicked:'choisi pour le groupe', soloQ:'Rallye solo ?', soloQSub:'Vous le lancez vous-même et quittez la liste du groupe.', soloYes:'Oui, rallye solo', soloNo:'Annuler', backGroup:'↩ liste du groupe', pickHint:'Touchez les chefs à inclure dans le groupe :', pickLocked:'Groupe en cours. Réinitialisez pour changer les chefs.', noAvail:'Pas encore de chef sur cette cible.', startGrp:'LANCER LE RALLYE DE GROUPE', noteSelFirst:'Choisissez d’abord au moins un chef.', youDefNote:'Vous défendez maintenant {t}. Vous ne défendez pas en jeu ? Touchez Retour à l’attaque.', notDefQ:'Vous ne défendez pas en jeu ? Touchez Retour à l’attaque', backAtk:'↩ Retour à l’attaque', pickAtk:'Choisissez une cible à attaquer.', compactBtn:'Vue compacte', fullBtn:'Vue complète', errConn:'Erreur de connexion. Veuillez actualiser la page.', resetConfirm2:'Quitter votre rôle et votre symbole actuels ? Votre nom est conservé.', keepMarQ:'Garder vos temps de marche ? Dans une nouvelle bataille, votre base a souvent bougé.', keepMar:'Garder les temps de marche', newMar:'Saisir de nouveaux temps', marKept:'Temps de marche conservés.', newBattleQ:'Est-ce une nouvelle bataille ? (Dernière ouverture il y a plus de 24 heures.)', newBattleYes:'Oui, nouvelle bataille', newBattleNo:'Non, même bataille', vVol:'Volume', rpLbl:'Ratio prédéfini', rpCustom:'Personnalisé', rpSetBtn:'Valider', myRatio:'Mon ratio', rpHdr:'Ratios prédéfinis', rpName:'Nom du ratio', rpAdd:'+ Ajouter un ratio', rpSave:'Enregistrer les ratios', rpSaved:'Ratios prédéfinis enregistrés.', rpErr:'Chaque ratio doit avoir un nom différent et trois nombres qui font 100 (10 ratios au maximum).', defRatio:'Ratio de défense', ovClr:'Utiliser le ratio du groupe', rpSet:'Ratio choisi : {r}', say_ready:'Contrôle de préparation', sameRatio:'Même ratio pour tous les rallyes', leadOwn:'(choix du chef)', youTag:'VOUS', lateHdr:'ENVOYEZ MAINTENANT · ACCÉLÉREZ', lateSub:'Votre marche {m} · impact dans {l} · accélérez de {s}', say_late:'Envoyez maintenant, accélérez', cancelRally:'Annuler le rallye', cancelQ:'Annuler ce rallye ? Les membres seront prévenus.', rallyCancelled:'Rallye annulé', cancelledSub:'Attendez que le chef relance', say_cancelled:'Rallye annulé', verLbl:'Version {v}', verNew:'Une nouvelle version de l’application est disponible.', verRefresh:'Actualiser', repBtn:'Signaler un problème', repQ:'Que s’est-il passé ? (facultatif) L’application enregistre aussi ce que montrait votre écran.', repSent:'Signalement envoyé. Merci.', repFail:'Impossible d’envoyer le signalement. Veuillez actualiser la page.', repHdr:'Signalements', repNone:'Aucun signalement.', repCopy:'Copier', repCopyAll:'Tout copier', repClear:'Tout supprimer', repClearQ:'Supprimer tous les signalements ?', repCopied:'Copié. Collez-le pour Claude.', repCopyManual:'Copiez ce texte :', ctrRole:'Contre-attaque', ctrPickSub:'DTF tient le Centre : défendez-le, ou contre-attaquez depuis une alliance alliée.', defendBtn:'Défendre', ctrHdr:'Contre-attaque', ctrSwQ:'Alliance changée ?', ctrSwSub:'Confirmez que vous avez rejoint l’alliance alliée dans le jeu.', ctrSwYes:'Oui, j’ai changé', ctrBmQ:'Base déplacée ?', ctrBmSub:'Votre base a-t-elle bougé depuis le changement ?', ctrBmNo:'Non, même base', ctrBmYes:'Oui, elle a bougé', ctrMarQ:'Marche vers le Centre', ctrMarSub:'Entrez votre temps de marche vers le Centre depuis votre nouvelle base (m:ss).', ctrMarErr:'Entrez un temps de marche, par exemple 0:42.', ctrWaitSub:'Marche vers le Centre {m} · l’admin vous dira quand lancer', ctrGoT:'LANCEZ MAINTENANT', ctrGoSub:'alerte il y a {s}', ctrGoTap:'Lancez votre contre-rallye sur le Centre, puis touchez ci-dessous', ctrStarted:'J’ai lancé le rallye', say_ctrGo:'Lancez votre contre-rallye maintenant', ctrAbortT:'ANNULEZ', ctrAbortSub:'Dissolvez votre contre-rallye dans le jeu maintenant', say_ctrAbort:'Annulez, dissolvez votre contre-rallye', ctrHoldT:'TENEZ LE CENTRE', ctrHoldSub:'Restez au Centre en défenseur jusqu’à l’arrivée des marches DTF, puis expulsez tous les défenseurs pour rendre le Centre.', ctrHandT:'EXPULSEZ MAINTENANT', ctrHandSub:'Les marches DTF sont arrivées : expulsez tous les défenseurs pour rendre le Centre.', say_ctrHand:'Rendez le Centre, expulsez les défenseurs maintenant', ctrDone:'Terminé · retour à DTF', ctrBack:'Retour à DTF', ctrNewMar:'Votre base a bougé : entrez vos nouveaux temps de marche.', ctrAdmHdr:'Contre-attaque ({n})', ctrNone:'Pas encore de contre-attaquant.', ctrRallying:'en rallye', ctrGoBtn:'LANCER LA CONTRE', ctrAbBtn:'ANNULER LA CONTRE', ctrHandBtn:'Rendre le Centre', ctrAbQ:'Dire aux contre-attaquants de dissoudre leur rallye ?', ctrSent:'Contre-attaquants alertés.', ctrStGo:'alerte envoyée il y a {s}', ctrStAbort:'annulation envoyée il y a {s}', ctrStHand:'remise envoyée il y a {s}', ctrTag:'CONTRE', ctrLand:'impact {s}', ctrEarly:'trop tôt', ctrTight:'juste', ctrGood:'bien', ctrLate:'tard', ctrOnlyThem:'Seul le contre-attaquant corrige cette marche.', tdlHdr:'Chef de défense des tours', tdlPick:'CHOISISSEZ L’ATTAQUE', tdlPickSub:'Touchez une attaque verte pour la prendre, puis foncez-y', tdlBeIn:'soyez-y avant · impact dans {l}', tdlLands:'impact dans · prenez la tête de la défense', tdlDrop:'Libérer', tdlTaken:'Un autre chef a pris cette attaque.', tdlGone:'L’attaque sur {t} a été retirée : prise terminée.', say_tdlIn:'Soyez-y maintenant', say_tdl:'Vous êtes chef de défense des tours', tdlYou:'L’admin vous a nommé chef de défense des tours.', tdlOff:'Vous n’êtes plus chef de défense des tours.', tdlAdmHdr:'Chefs de défense des tours ({n}/{m})', tdlNoLeads:'Aucun chef de rallye à choisir.', roleTdl:'Chef de défense des tours', skBtn:'Skin', skHdr:'Skin', skUpload:'Charger un fichier de skin', skEdit:'Créer le mien', skEditClose:'Fermer l’éditeur', skAi:'Invite IA', skDownload:'Télécharger le skin', skDefault:'Skin par défaut', skNow:'Actuel : {n}', skOffNow:'skins désactivés pour cette visite (skin=off)', skRadius:'Coins', skSt_flat:'Plat', skSt_gradient:'Dégradé', skSt_bevel:'Métal', skSt_glow:'Lueur', skSt_storm:'Tempête', skF_system:'Police standard', skF_rounded:'Police arrondie', skF_serif:'Police à empattements', skF_mono:'Police machine à écrire', skF_condensed:'Police étroite', skWall:'Image de fond', skNoWall:'Sans image', skDim:'Assombrir', skName:'Nom du skin', skSave:'Enregistrer le skin', skSaved:'Skin enregistré sur cet appareil.', skLoaded:'Skin « {n} » chargé.', skDefOk:'Skin par défaut (MAD OPS) rétabli.', sk_bg:'Page', sk_pan:'Panneaux', sk_bd:'Bordures', sk_tx:'Texte', sk_mu:'Petit texte', sk_am:'Accent', skTx:'le texte', skPan:'les panneaux', skBg:'la page', skMu:'le petit texte', skAm:'l’accent', skErrFile:'Ce n’est pas un fichier de skin MAD OPS.', skErrColor:'La couleur « {k} » doit ressembler à #12ab34.', skErrWall:'Le fond doit être une image.', skErrCon:'Trop difficile à lire : {a} sur {b}. Choisissez des couleurs plus contrastées.', skErrAm:'L’accent est trop sombre pour le texte des boutons. Choisissez un accent plus clair.', skErrSpace:'Pas assez d’espace sur cet appareil pour garder le skin.', skAiHow:'Copiez ceci, remplacez la partie entre [crochets] par votre idée et collez-le dans n’importe quel chat IA. Enregistrez sa réponse en fichier .json et chargez-le ici.', betaTitle:'BÊTA EN DIRECT', betaSub:'Version {v} · cette bataille est un test en direct de nouvelles fonctions. Des choses peuvent casser : continuez à jouer et aidez-nous à trouver les problèmes.', betaNewHdr:'À essayer', betaN1:'Contre-rallye : quand DTF tient le Centre, touchez Centre → Contre-attaque.', betaN2:'Chefs de défense des tours : l’admin choisit les chefs les plus forts pour foncer de tour en tour.', betaN3:'Ratios prédéfinis : chaque ratio affiche maintenant son nom (Attaque 1, Défense 2, Personnalisé).', betaN4:'ENVOYEZ MAINTENANT · ACCÉLÉREZ quand une attaque est trop proche pour un envoi normal.', betaN5:'Skins : touchez Skin pour changer l’apparence. Skin par défaut, en bas, la rétablit.', betaRepHdr:'En cas de problème', betaR1:'Touchez Signaler un problème (sous Quitter et recommencer) dès que possible. L’application enregistre ce que montre votre écran.', betaR2:'Écrivez quelques mots : ce que vous faisiez et ce que vous attendiez, par exemple « rejoint VX, pas de REJOIGNEZ ».', betaR3:'Continuez à jouer. Si les minuteurs semblent faux, suivez les chefs dans le chat.', betaR4:'Après la bataille, dites à l’admin tout ce dont vous vous souvenez. L’admin rassemble tous les signalements.', betaFoot:'Merci d’aider à tester MAD OPS.', betaOk:'J’accepte', betaLink:'Infos bêta', tipNoMore:'Ne plus afficher', tip_lead_t:'Chef de rallye', tip_lead:'Vous menez les rallyes d’attaque sur cette cible. Vous êtes tout de suite disponible pour un rallye de groupe : l’admin choisit les chefs et lance le contrôle de préparation. Choisissez Rallye solo si vous lancez le vôtre. Sous Mon ratio, vous pouvez donner à votre rallye son propre ratio.', tip_solo_t:'Rallye solo', tip_solo:'Vous lancez ce rallye vous-même. Choisissez un ratio, touchez DÉPART quand vous lancez le rallye dans le jeu, puis tapez le minuteur du jeu pour synchroniser. Vos membres suivent vos minuteurs. Annuler le rallye l’arrête et les prévient.', tip_join_t:'Rejoindre un rallye', tip_join:'Vous suivez un chef de rallye. Couleurs sur la carte : vert = pas encore en marche, jaune clignotant = marche dans 20 s, rouge clignotant = dans 5 s, rouge = en marche. Quand votre chef lance, REJOIGNEZ ! apparaît avec le ratio : rejoignez dans le jeu.', tip_def_t:'Défense', tip_def:'Quand l’admin synchronise une attaque, vous recevez un minuteur d’envoi basé sur votre propre marche, pour que vos renforts arrivent juste après. Si une attaque est trop proche pour un envoi normal, vous voyez ENVOYEZ MAINTENANT · ACCÉLÉREZ avec l’accélération nécessaire.', tip_ctr_t:'Contre-attaque', tip_ctr:'Vous attaquez le Centre depuis une alliance alliée pour arriver juste après une forte attaque ennemie, sur des défenseurs ennemis affaiblis. L’admin vous dit quand lancer. Si ça marche, vous tenez le Centre jusqu’à l’arrivée des marches DTF, puis vous le rendez.', tip_tdl_t:'Chef de défense des tours', tip_tdl:'Vous foncez de tour en tour pour prendre la tête de la défense avant chaque impact. Les attaques vertes sont les prochaines à couvrir. En prendre une la bloque pour l’autre chef. « Soyez-y avant » tombe 10 s avant l’impact.', tip_ratio_t:'Ratios prédéfinis', tip_ratio:'Choisissez un ratio nommé, préparé par l’admin avant le combat, ou Personnalisé pour taper le vôtre. Tout le rallye voit le nom avec les chiffres. Toucher les chiffres passe en Personnalisé.', tip_skin_t:'Skins', tip_skin:'Changez l’apparence de l’application sur cet appareil : choisissez un skin intégré, créez le vôtre ou chargez le fichier d’un ami. Les couleurs de rallye et d’alerte ne changent jamais. Skin par défaut, en bas de page, rétablit toujours l’apparence normale.', tip_compact_t:'Vue compacte', tip_compact:'Affiche seulement la boîte des minuteurs avec de grands boutons, pour une fenêtre flottante ou un écran partagé à côté du jeu. Vue complète réaffiche la page.', tip_pop_t:'Surimpression', tip_pop:'Met la boîte des minuteurs dans une petite fenêtre au-dessus du jeu. Sur PC, les boutons y fonctionnent ; sur téléphone, c’est une image de la boîte.', tip_report_t:'Signaler un problème', tip_report:'Enregistre ce que montre votre écran et ce que faisait l’application, avec votre note, pour l’admin. Utilisez-le dès que quelque chose semble faux, puis continuez à jouer.', tip_help_t:'Demander de l’aide', tip_help:'Demande l’aide des admins pour votre rallye. Le premier admin qui répond peut synchroniser et ajuster vos minuteurs pour vous.', tip_admAtk_t:'Rallyes de groupe', tip_admAtk:'Tous les chefs qui ne sont pas en solo sont listés. Touchez ceux que vous voulez, réglez leur ordre et leur ratio, puis LANCER LE RALLYE DE GROUPE. Les chefs touchent PRÊT et le compte à rebours démarre seul.', tip_admDef_t:'Attaques en approche', tip_admDef:'Synchronisez chaque attaque ennemie avec le minuteur du jeu. Les défenseurs de cette cible reçoivent des minuteurs d’envoi selon leur propre marche. La marche d’un nouvel ennemi est estimée à 30 s jusqu’à ce que vous l’ajustiez en direct. Réglez aussi le ratio de défense ici.', tip_admCtr_t:'Contre-attaque', tip_admCtr:'Les contre-attaquants sont listés ici. Touchez LANCER LA CONTRE quand une forte attaque ennemie apparaît, ANNULER LA CONTRE pour l’arrêter pendant le rassemblement, et Rendre le Centre quand les marches DTF y arrivent. Synchronisez leur rallye avec la puce bleue CONTRE.', tip_admTdl_t:'Chefs de défense des tours', tip_admTdl:'Choisissez jusqu’à 2 chefs de rallye forts pour foncer entre les tours. Ils voient les prochaines attaques à couvrir et les prennent, une par tour.', tip_admRp_t:'Ratios prédéfinis', tip_admRp:'Nommez et réglez les ratios avant le combat. Tout le monde les choisit dans une liste : moins de saisie en bataille.', tip_admRep_t:'Signalements', tip_admRep:'Les signalements envoyés pendant la bataille, avec ce que montrait l’écran. Tout copier, puis collez-le pour Claude.', tutLater:'Le tutoriel reviendra dans une prochaine mise à jour.', betaAgree:'En utilisant MAD OPS, vous acceptez de ne pas le partager en dehors de DTF ou ROS.', refHdr:'Liens partagés', refLine:'a amené {k} :', refNone:'Personne n’est encore venu par un lien partagé.', refNoTag:'Ouvert sans lien identifié : {k}', refUnknown:'lien inconnu {c}', shareBtn:'Copier le lien pour un coéquipier', shareNeedName:'Enregistrez d’abord votre nom en jeu.', shareText:'MAD OPS : minuteur de rallye DTF/ROS. Ne pas partager hors DTF ou ROS.', shareDone:'Partagé. Uniquement à des coéquipiers DTF ou ROS.', shareCopied:'Lien copié. Envoyez-le uniquement à un coéquipier DTF ou ROS.', nbBtn:'RÉINITIALISER POUR UNE NOUVELLE BATAILLE', nbQ:'Tapez RESET pour lancer une nouvelle bataille. Tout le monde ressaisit ses temps de marche (les noms sont conservés). Attaques, rallyes, cibles tenues, ennemis enregistrés, contre-attaques et tours prises sont effacés.', nbNo:'Pas de réinitialisation : RESET n’a pas été tapé.', nbSent:'Réinitialisation envoyée à tous.', nbNeedCtl:'Seul l’admin aux commandes peut réinitialiser.', nbDone:'Nouvelle bataille : tout a été réinitialisé. Entrez vos temps de marche.', shareFail:'Impossible de copier le lien. Réessayez.', notAdmin:'Ce compte n’est pas dans la liste des admins. Demandez au propriétaire de l’ajouter dans la section Admins.', notAdminErr:'Connecté, mais ce compte n’est pas dans la liste des admins. Demandez au propriétaire de l’ajouter.', tooMany:'Trop de tentatives. Patientez un moment (jusqu’à une heure), puis réessayez.', admHdr:'Admins', admHow:'Créez le compte dans Firebase Authentication (e-mail et mot de passe), puis ajoutez l’e-mail ici. Les propriétaires (★) peuvent modifier cette liste.', admFixed:'Les admins intégrés aux règles de sécurité ne sont pas affichés ici.', admOwner:'propriétaire', admOwnerTip:'Les propriétaires peuvent ajouter et retirer des admins', admAdd:'Ajouter un admin', admBad:'Entrez une adresse e-mail complète.', admHave:'Cet e-mail est déjà admin.', admRmQ:'Retirer {e} des admins ?', admSaved:'Liste des admins enregistrée.', admFail:'Enregistrement impossible. Seuls les propriétaires peuvent modifier la liste (publiez d’abord les nouvelles règles).', helpBtn:'? Aide', helpTitle:'AIDE MAD OPS', helpClose:'Fermer', helpWhatH:'Qu’est-ce que MAD OPS ?', helpWhat1:'MAD OPS est le minuteur de combat de DTF pour les batailles Supreme Prison et SvS. Vous jouez toujours dans le jeu : MAD OPS vous dit exactement quand lancer, rejoindre ou envoyer, pour que les marches de tout le monde arrivent ensemble.', helpWhat2:'Le but : fini les comptes à rebours dans le chat. L’admin dirige le combat depuis un seul écran, l’horloge de chaque téléphone est calée dessus, et votre écran affiche seulement ce que vous devez faire ensuite. Ainsi DTF frappe plus fort et défend mieux.', helpBetaH:'Qu’est-ce qu’une bêta en direct ?', helpBeta1:'Une bêta est une version de test. C’est un vrai combat, mais certaines fonctions de l’application sont utilisées en bataille pour la première fois, donc tout ne marchera peut-être pas parfaitement.', helpBeta2:'Si quelque chose semble faux, continuez à jouer et suivez les chefs dans le chat. Dès que vous pouvez, appuyez sur Signaler un problème (à côté de Quitter et recommencer) pour que l’admin puisse corriger.', helpStartH:'Pour commencer', helpS1:'En haut de l’écran, choisissez votre langue et appuyez sur le bouton du son jusqu’à voir Son activé, pour entendre les annonces.', helpS2:'Saisissez votre nom en jeu et votre temps de marche vers chacune des cinq cibles en minutes:secondes (par exemple 0:42), puis appuyez sur Enregistrer. Le jeu affiche le temps de marche quand vous envoyez des troupes vers une cible.', helpS3:'Sur la carte, appuyez sur la cible où l’on vous dit d’aller.', helpS4:'Choisissez votre rôle. Si DTF tient déjà cette cible, vous êtes placé en défense.', helpBoxH:'Surveillez la grande case', helpBox:'La grande case en haut vous dit toujours quoi faire maintenant. EN VEILLE veut dire attendre. Quand elle devient verte, agissez tout de suite dans le jeu.', helpRolesH:'Rôles simples', helpJoin:'Participant (REJOINDRE) : appuyez sur le symbole du chef de rallye que vous rejoignez, puis attendez. Quand la case devient verte et affiche REJOIGNEZ !, rejoignez ce rallye dans le jeu avec le ratio de troupes indiqué.', helpDef:'Défenseur : vous renforcez une cible tenue par DTF. Quand le minuteur atteint zéro et que la case affiche ENVOI, envoyez vos renforts dans le jeu. ENVOYEZ MAINTENANT · ACCÉLÉREZ veut dire envoyer tout de suite et accélérer votre marche.', helpLead:'Chef de rallye (CHEF) : pour les joueurs expérimentés. Une courte astuce l’explique la première fois que vous le choisissez.', helpBtnsH:'Boutons utiles', helpB1:'Afficher en surimpression : une petite fenêtre de minuteur au-dessus du jeu.', helpB2:'Garder l’écran allumé : empêche votre écran de s’éteindre.', helpB3:'Vue compacte : seulement la case du minuteur, pour l’écran partagé à côté du jeu.', helpB4:'Quitter et recommencer : retire votre rôle pour en choisir un autre. Votre nom est gardé, et l’app demande s’il faut garder vos temps de marche.', helpAsk:'Toujours un doute ? Demandez dans le chat de l’alliance. En cas de doute, suivez les chefs dans le jeu.', helpTips:'Revoir les astuces', helpTipsOk:'Les astuces réapparaîtront à chaque fonction utilisée.', betaHelp:'Nouveau sur MAD OPS ? Appuyez sur ? Aide en haut de l’écran pour un guide rapide.', helpSyncH:'Ce que l’app synchronise', helpSync1:'Rallyes : chaque chef de rallye reçoit son propre moment de lancement, calculé selon sa marche, pour que les rallyes partis de bases différentes frappent la cible ensemble.', helpSync2:'Participants : vous êtes prévenu dès que le rallye de votre chef s’ouvre, pour qu’il se remplisse à temps.', helpSync3:'Défense : votre moment d’envoi est calculé selon votre propre temps de marche, pour que vos renforts arrivent juste après chaque coup ennemi.', helpSync4:'Annonces : les messages et les annonces vocales de l’admin arrivent à tout le monde au même moment.'
},
es: {
 chooseFile:'Elegir archivo', fileTooBig:'Archivo demasiado grande. Usa un clip de menos de 700 KB.', fileBad:'No se pudo reproducir ese archivo. Usa mp3, m4a o wav.', fileSaving:'Guardando…', builtIn:'incluido', clipHint:'Elige un archivo de audio corto para cada botón de voz. La voz de la cuenta atrás viene incluida en la app.',
 updBtn:'Actualizar', noteEnemyName:'Escribe o elige primero un nombre de enemigo.', enemySaved:'{n} guardado en {t}', msgHdr:'MENSAJES', msgTo:'Para', audAll:'Todos', audLeads:'Todos los líderes de rally', audJoiners:'Todos los participantes', audLead:'Líder {s}', audRally:'Participantes de {s}', msgPh:'Escribe un mensaje', sendBtn:'Enviar', msgB1:'Prepárate para iniciar tu rally', msgB2:'Prepárate para defender', msgSent:'Enviado a {a}: {m}', msgEmpty:'Escribe primero un mensaje.', msgClose:'Cerrar mensaje', editPresets:'Editar botones', doneEdit:'Terminar edición', savePresets:'Guardar botones', presetsSaved:'Botones guardados', textBtns:'BOTONES DE TEXTO', voiceBtns:'BOTONES DE VOZ', cdClips:'VOZ DE LA CUENTA ATRÁS', labelPh:'Etiqueta', textPh:'Mensaje', recBtn:'Grabar', stopBtn:'Parar', playBtn:'Reproducir', delBtn:'Borrar', noClip:'sin grabación', hasClip:'grabado', voiceN:'Voz {n}', micErr:'Micrófono no disponible: {m}', clipSaved:'Grabación guardada', clipEmpty:'No se grabó nada. Inténtalo de nuevo.', clipDelQ:'¿Borrar esta grabación?', voiceNoClip:'Grábalo primero.', voiceDev:'Voz: dispositivo', voiceRec:'Voz: grabada', voiceNone:'Aún no hay grabaciones. Se usa la voz del dispositivo.', voiceNeedSound:'Activa el sonido para oír las grabaciones.', voiceSent:'Voz enviada a {a}: {m}', voiceHint:'Los botones de voz solo suenan para los jugadores que eligieron la voz grabada.',
 tutBtn:'Tutorial', tutNote:'Solo práctica. No se envía nada a tu equipo.', tutMenu:'Elige una práctica', tutLeadBtn:'Líder de rally', tutJoinBtn:'Participante', tutDefBtn:'Defensa', tutStepN:'Paso {n} de {m}', tutNext:'Siguiente', tutExit:'Salir del tutorial', tutOpen:'Listo: abrir la superposición', tutCont:'Continuar', tutAgain:'Practicar de nuevo', tutToMenu:'Menú', tutSound:'Activar sonido', tutAdmin:'Cierra la sesión de admin antes de empezar el tutorial.', tutTeam:'Envíos del equipo', tutSwitch:'Cambia a tu juego', tutStartIn:'empieza enseguida', tutRetLbl:'¡Bien hecho!', tutRetTime:'VUELVE', tutRetSub:'vuelve al tutorial', tutRetSay:'Bien hecho. Vuelve al tutorial.', sL1:'Eres el líder de rally VX. Dos compañeros, AB y KT, son simulados. El tutorial hace de admin.', sL2:'Toca LÍDER en el cuadro de abajo.', sL3:'Tu símbolo y tu tiempo de marcha ya están rellenados (VX, 0:50). Compruébalos y toca OK.', sL4:'ESPERA: el admin aún no ha confirmado a los líderes. Toca Siguiente para que confirme.', sL5:'EN ESPERA: los líderes están bloqueados. Toca Siguiente para iniciar la comprobación.', sL6:'¡Comprobación! Toca el botón verde LISTO en el cuadro de abajo.', sL7:'Todos están listos. El admin inicia la cuenta atrás. Toca el botón, cambia a tu juego y mira la ventana flotante.', sRun:'Cambia a tu juego ahora. La ventana flotante cuenta 3, 2, 1, luego muestra tu temporizador de lanzamiento y parpadea ENVÍA. Te avisará cuándo volver. Si no se abre, mira el cuadro de abajo.', sL9:'Ese fue un rally completo. AB lanzó primero para que todos los rallies impacten juntos. En el móvil, toca LISTO dentro de la app antes de abrir la superposición.', sJ1:'Eres participante. Cuatro líderes (AB, KT, QZ, VX) son simulados. El tutorial hace de admin y de líderes.', sJ2:'Toca UNIRSE en el cuadro de abajo.', sJ3:'ESPERA: el admin aún no ha confirmado a los líderes. Toca Siguiente para que confirme.', sJ4:'Elige tu rally: toca el símbolo del líder al que te unes.', sJ5:'Introduce tu tiempo de marcha (rellenado 0:41) y toca OK.', sJ6:'EN ESPERA: nada que tocar. Toca Siguiente para iniciar la comprobación.', sJ7:'La cuenta atrás va a empezar. Toca el botón, cambia a tu juego y mira. Cuando tu líder lance, la ventana se pone verde: RALLY INICIADO, ¡ÚNETE YA!', sJ9:'Bien hecho. Cuando veas RALLY INICIADO, únete a ese rally en el juego.', sD1:'El mismo equipo (AB, KT, QZ, VX) defiende contigo. El admin cambió al modo Defensa.', sD2:'Escribe tu marcha al centro, 0:36, y toca OK.', sD3:'Viene un ataque. Todos envían para que los refuerzos lleguen 0,4 s después del impacto. Toca el botón, cambia a tu juego y envía cuando el temporizador llegue a cero.', sD6:'Ahora llegan tres ataques muy seguidos. El número pequeño indica cuántos envíos te quedan. Un brillo rojo significa que dos ataques llegan con menos de 1 segundo de diferencia, así que envías dos veces casi a la vez. Cada temporizador se sustituye solo por el siguiente.', sD9:'Ya sabes defender. Si empiezas tarde, acelera tu marcha en el juego. Tras el último envío, revisa las proporciones de tropas.',
 ginPh:'Nombre en el juego', nameNeeded:'Introduce tu nombre en el juego', ctlYou:'Tienes el control', ctlView:'Solo lectura · {n} tiene el control', ctlNone:'Nadie tiene el control todavía', adminsHere:'Admins presentes', reqBtn:'Pedir el control', reqSent:'Solicitud enviada', reqQueue:'Puesto {p} en la cola', reqCancel:'Cancelar', reqRow:'{n} pide el control', xferBtn:'Transferir', declBtn:'Rechazar', ctlGained:'Ahora tienes el control', ctlLost:'El control pasó a {n}', ctlDeclined:'Tu solicitud fue rechazada', ctlExpired:'Tu solicitud caducó', ctlNoReq:'Esa solicitud ya no existe', viewNote:'Solo el admin con el control puede cambiar esto. Aún puedes usar la casilla LÍDER o UNIRSE.',
 emailPh:'Correo del admin', badLogin:'Correo o contraseña incorrectos', errEmailOff:'Activa el inicio de sesión con correo y contraseña en Firebase Authentication.',
 back:'↩', language:'Idioma', live:'En línea', offline:'Sin conexión', connecting:'Conectando…', room:'Sala', clockPill:'reloj ±{n} ms', clockNone:'reloj --',
 soundOff:'Sonido apagado', soundOn:'Sonido activado', popBtn:'Mostrar superposición', wakeBtn:'Mantener pantalla encendida', wakeOn:'Pantalla encendida', popPreview:'Vista previa de la superposición', adminLink:'Admin',
 resetMe:'↺ Salir y empezar de nuevo', resetConfirm:'¿Salir y borrar tu rol, símbolo y marcha?', marchTarget:'Marcha al objetivo', marchCenter:'Marcha al centro',
 roleLead:'Líder de rally {sym}', roleJoin:'Participante del rally', noRole:'Aún sin rol', adminSuffix:' · admin',
 errRules:'Firestore bloqueó la solicitud. Revisa las reglas de seguridad.', errAuth:'Activa el inicio de sesión anónimo en Firebase Authentication.', errGeneric:'Error: {m}',
 noteMarchFirst:'Introduce primero un tiempo de marcha.', noteConfirmFirst:'Confirma primero a los líderes.', noteNoLeaders:'Aún no hay líderes.', noteTypeTimer:'Escribe el temporizador que muestra el juego.',
 noteLimit:'El límite es de seis ataques. Borra uno primero.', noteTaken:'Otro admin está activo.', noteTookOver:'Otro admin tomó el control.',
 noteWakeNo:'Mantener pantalla encendida no es compatible aquí.', noteWakeRef:'Pantalla encendida rechazada: {m}', notePopRef:'Superposición rechazada: {m}', notePopTap:'Superposición rechazada: {m} Vuelve a tocar.', notePopNone:'Este navegador no admite superposición.',
 chooseRole:'Elige tu rol', lead:'LÍDER', join:'UNIRSE', leadEntry:'Líder de rally · símbolo + marcha', symErr:'El símbolo debe tener 2 caracteres', marErr:'Introduce tu tiempo de marcha', symTaken:'Símbolo ocupado',
 ok:'OK', editBtn:'↩ editar', waitingAdmin:'Esperando al admin', standingBy:'En espera', wait:'ESPERA', standby:'EN ESPERA', readyCheck:'Comprobación', ready:'LISTO', readyDone:'LISTO ✓',
 waitOthers:'esperando a los demás', notInOp:'No estás en esta operación', missed:'PERDIDO', waitNext:'espera la siguiente', cdLabel:'El rally empieza en', launchIn:'{sym} lanza en',
 send:'ENVÍA', rallyRunning:'Rally en curso', launched:'LANZADO', doneLbl:'Hecho', DONE:'HECHO', waitAdminSub:'espera al admin', joinWait:'Esperando a los líderes', pickRally:'Elige tu rally',
 joiningMarch:'Uniéndote a {sym} · tu marcha', joining:'Uniéndote a {sym}', rallyNot:'el rally aún no ha empezado', rallyStarted:'RALLY INICIADO', joinNow:'¡ÚNETE YA!', readyQ:'¿LISTO?',
 marchSub:'marcha {t}', changeBtn:'↩ cambiar', cdSub:'el rally empieza', say_send:'Envía', say_join:'Rally iniciado. Únete ahora.', say_sound:'El sonido está activado',
 centerMarch:'marcha al centro {t}', defense:'Defensa', sendIn:'{l} · envía en', thenGap:' · luego {s} s', allSent:'Todo enviado', checkRatios:'Revisa las proporciones de tropas', editMarch:'✎ marcha',
 modeChange:'CAMBIO DE MODO', modeDef:'DEFENSA', modeAtk:'ATAQUE',
 admin:'ADMIN', logout:'Cerrar sesión', tabAtk:'1 · ATAQUE DE RALLY', tabDef:'2 · DEFENSA', modeConfirm:'¿Cambiar al modo {m}? Todos los jugadores recibirán un aviso. Se conservan roles y marchas.',
 modeNameAtk:'ATAQUE DE RALLY', modeNameDef:'DEFENSA', pw:'Contraseña de admin', login:'Entrar', wrongPw:'Contraseña incorrecta',
 leadersJoiners:'Líderes {a} · Participantes {b}', confirmLeaders:'CONFIRMAR LÍDERES', leadersLocked:'LÍDERES BLOQUEADOS',
 hitOrder:'ORDEN DE IMPACTO · PRIMER IMPACTO ARRIBA', joinedN:'{n} unidos', noLeadersMsg:'Aún no hay líderes. Comparte el enlace y pide que elijan LÍDER.', leadBuffer:'Margen inicial',
 readyCheckBtn:'COMPROBAR LISTOS', startNow:'EMPEZAR YA', reset:'REINICIAR', resetOpConfirm:'¿Reiniciar la operación? Líderes y participantes vuelven a introducir sus datos.',
 offsetsNote:'Desfases: 0,1 s entre rallies, el último +0,4 s. Cambia cualquiera con − y +.', startsT:'sale {t}', tMinus:'T−{t}', launchedLbl:'lanzado',
 stStarting:'Empieza en {n}', stRunning:'Operación en curso', stReadyWait:'Comprobación: esperando a los líderes', stConfirmed:'Líderes confirmados', stCollecting:'Recopilando líderes', moveUp:'Subir', moveDown:'Bajar',
 known:'ENEMIGOS CONOCIDOS · TOCA PARA RELLENAR', knownNone:'Ninguno aún. Los nombres nuevos empiezan en 0:30.', newAttack:'NUEVO ATAQUE', namePh:'NOMBRE', marchWord:'marcha', rally5:'RALLY 5:00', alreadyMarching:'YA EN MARCHA',
 timerInGame:'temporizador del juego', syncBtn:'SINCRONIZAR', resyncBtn:'RESINCRONIZAR', timeline:'LÍNEA DE TIEMPO', noAttacks:'No hay ataques entrantes.', landPlus:'impacto +', gapLbl:'intervalo {a} → {b} {s} s',
 clearAll:'Borrar todo', clearAllConfirm:'¿Borrar todos los ataques entrantes?', rallyW:'RALLY', marchW:'MARCHA', landedW:'IMPACTÓ', removeBtn:'QUITAR',
 resetDef:'REINICIAR DEFENSA', resetDefConfirm:'¿Reiniciar la defensa? Se borran todos los ataques y la barra de sincronización. Se conservan los enemigos conocidos.', forgetAll:'Olvidar todos', forgetAllConfirm:'¿Olvidar todos los enemigos conocidos?', forgetOne:'Olvidar {n}',
 profHdr:'TU PERFIL', namePh2:'Nombre en el juego', nameReq:'Escribe tu nombre en el juego.', marHdr:'Tiempo de marcha a cada objetivo', marReq:'Escribe los cinco tiempos de marcha.', tC:'Centro', tN:'Norte', tS:'Sur', tE:'Este', tW:'Oeste', saveProf:'Guardar', editProf:'Editar perfil', profSaved:'Perfil guardado', pickTarget:'Elige un objetivo en el mapa', mapHdr:'OBJETIVOS', defBadge:'DEF', chooseAct:'{t} · elige tu rol', defendAnyway:'Defender de todos modos', leave:'↺ Dejar este objetivo', meLine:'{n} · {t} · {r}', meNone:'{n} · sin objetivo', roleLeadSym:'líder {s}', roleJoinOf:'uniéndote a {s}', roleDef:'defendiendo', joinedList:'Unidos: {n}', nobodyJoined:'Aún no se ha unido nadie', symEntry:'{t} · tu símbolo de 2 letras', groupBtn:'RALLY DE GRUPO', soloBtn:'RALLY SOLO', chooseMode:'{t} · {s} · ¿grupo o solo?', unregister:'Darse de baja', grpNotCalled:'Esperando a que el admin llame al grupo', grpReset:'El grupo se reinició', rejoin:'Volver al grupo', soloRatio:'{t} · {s} · proporción de tropas', startBtn:'INICIAR', ratioErr:'Escribe una proporción de tropas que sume 100.', ratioPh:'Escuderos/Bombarderos/Tiradores', troops:'Tropas {r}', gathering:'{t} · {s} reuniendo', gatheringEst:'{t} · {s} reuniendo (est.)', syncGather:'Sincronizar', gatherPh:'temporizador', syncedOk:'Sincronizado', estTag:'est.', prepReinforce:'Prepárate para reforzar', verifying:'Verificando el éxito', winBtn:'Ataque exitoso', failBtn:'Ataque fallido', say_reinforce:'Prepárate para reforzar', say_verify:'Verificando el éxito', say_disband:'Rally disuelto', say_defense:'Cambiando a defensa', pickLead:'{t} · elige un rally', noLeadsHere:'Aún no hay líderes de rally en {t}', joiningSym:'{t} · uniéndote a {s}', disbanded:'Rally disuelto', pickAgain:'elige otro rally', defending:'{t} · defendiendo', noIncoming:'aún no hay ataques entrantes', nowDef:'{t} está ahora en defensa. Si no estás defendiendo, elige otro rol.', youDef:'Ahora defiendes {t}.', mgTarget:'GESTIONAR OBJETIVO', myTargetBtn:'Mi objetivo', subAtk:'Ataque', subDef:'Defensa', grpHdr:'RALLY DE GRUPO', callGroup:'Llamar al grupo', endGroup:'Terminar grupo', endGroupQ:'¿Terminar el grupo en {t}? Los líderes vuelven a elegir grupo o solo.', setRatio:'Aplicar', ralliesHdr:'RALLIES EN {t}', noRallies:'No hay rallies en curso.', soloTag:'solo', groupTag:'grupo', ratioOv:'proporción', phGather:'Reuniendo {x}', phGatherEst:'Reuniendo {x} (est.)', phMarch:'Marchando {x}', phVerify:'Verificando', winQ:'¿Marcar el ataque a {t} como exitoso? Todos sus participantes pasan a defensa.', failQ:'¿Marcar el ataque a {t} como fallido?', heldOn:'Tomado: sí', heldOff:'Tomado: no', defCount:'{n} defendiendo', audTgt:'Todos en {t}', audOne:'{n}', audPlayers:'JUGADORES', audFilter:'Filtrar nombres', dupMark:'⚠ duplicado', audLeadsGrp:'LÍDERES', audRallies:'MIEMBROS DE RALLY', audGeneral:'GENERAL', marNotOk:'⚠ marcha sin confirmar · vigila el juego', marNotOkAdm:'⚠ marcha sin confirmar', helpReqBtn:'Pedir ayuda', helpCancel:'Cancelar ayuda', helpWaiting:'Ayuda pedida…', helpByLbl:'{n} está ayudando', helpCallBtn:'AYUDA: {s} {n} · {t}', helpingBar:'Ayudando a {s} en {t}', helpDone:'Ayuda terminada', helpTaken:'Otro admin ya está ayudando.', helpNote:'{n} te está ayudando', helpRallyWait:'el rally aún no empezó', helpCount:'Tus peticiones de ayuda: {n}', msgB3:'Más peticiones de ayuda', suckOne:'¡{n} es el más malo!', suckTie:'¡{n} son los más malos!', andWord:' y ', noHelpYet:'Nadie ha pedido ayuda todavía.', ctlOtherDev:'El control está en tu otro dispositivo', takeHere:'Tomar el control en este dispositivo', wakeOk:'La pantalla seguirá encendida mientras esta página esté abierta. Toca de nuevo para apagarlo.', changeMode:'↩ grupo/solo', grpAvail:'disponible', grpAvailSub:'el admin puede elegirte para un grupo', grpPicked:'elegido para el grupo', soloQ:'¿Rally solo?', soloQSub:'Lo inicias tú mismo y sales de la lista del grupo.', soloYes:'Sí, rally solo', soloNo:'Cancelar', backGroup:'↩ lista del grupo', pickHint:'Toca los líderes para el grupo:', pickLocked:'Grupo en curso. Reinicia para cambiar los líderes.', noAvail:'Aún no hay líderes en este objetivo.', startGrp:'INICIAR RALLY DE GRUPO', noteSelFirst:'Elige al menos un líder primero.', youDefNote:'Ahora defiendes {t}. ¿No defiendes en el juego? Toca Volver al ataque.', notDefQ:'¿No defiendes en el juego? Toca Volver al ataque', backAtk:'↩ Volver al ataque', pickAtk:'Elige un objetivo para atacar.', compactBtn:'Vista compacta', fullBtn:'Vista completa', errConn:'Error de conexión. Recarga la página.', resetConfirm2:'¿Dejar tu rol y símbolo actuales? Tu nombre se conserva.', keepMarQ:'¿Conservar tus tiempos de marcha? En una batalla nueva tu base suele moverse.', keepMar:'Conservar tiempos', newMar:'Escribir tiempos nuevos', marKept:'Tiempos de marcha conservados.', newBattleQ:'¿Es una batalla nueva? (Abierta por última vez hace más de 24 horas.)', newBattleYes:'Sí, batalla nueva', newBattleNo:'No, la misma batalla', vVol:'Volumen', rpLbl:'Proporción guardada', rpCustom:'Personalizada', rpSetBtn:'Aplicar', myRatio:'Mi proporción', rpHdr:'Proporciones guardadas', rpName:'Nombre', rpAdd:'+ Añadir proporción', rpSave:'Guardar proporciones', rpSaved:'Proporciones guardadas.', rpErr:'Cada proporción necesita un nombre distinto y tres números que sumen 100 (máximo 10).', defRatio:'Proporción de defensa', ovClr:'Usar la del grupo', rpSet:'Proporción elegida: {r}', say_ready:'Control de listos', sameRatio:'Misma proporción para todos los rallies', leadOwn:'(elección del líder)', youTag:'TÚ', lateHdr:'ENVÍA YA · ACELERA', lateSub:'Tu marcha {m} · impacto en {l} · acelera {s}', say_late:'Envía ya, acelera', cancelRally:'Cancelar rally', cancelQ:'¿Cancelar este rally? Se avisará a los miembros.', rallyCancelled:'Rally cancelado', cancelledSub:'Espera a que el líder vuelva a iniciar', say_cancelled:'Rally cancelado', verLbl:'Versión {v}', verNew:'Hay una nueva versión de la app.', verRefresh:'Recargar ahora', repBtn:'Reportar un problema', repQ:'¿Qué falló? (opcional) La app también guarda lo que mostraba tu pantalla.', repSent:'Reporte enviado. Gracias.', repFail:'No se pudo enviar el reporte. Recarga la página.', repHdr:'Reportes de problemas', repNone:'Aún no hay reportes.', repCopy:'Copiar', repCopyAll:'Copiar todo', repClear:'Borrar todo', repClearQ:'¿Borrar todos los reportes?', repCopied:'Copiado. Pégalo para Claude.', repCopyManual:'Copia este texto:', ctrRole:'Contraataque', ctrPickSub:'DTF tiene el Centro: defiéndelo o contraataca desde una alianza aliada.', defendBtn:'Defender', ctrHdr:'Contraataque', ctrSwQ:'¿Cambiaste de alianza?', ctrSwSub:'Confirma que te cambiaste a la alianza aliada en el juego.', ctrSwYes:'Sí, me cambié', ctrBmQ:'¿Se movió tu base?', ctrBmSub:'¿Tu base se movió desde que cambiaste?', ctrBmNo:'No, misma base', ctrBmYes:'Sí, se movió', ctrMarQ:'Marcha al Centro', ctrMarSub:'Escribe tu tiempo de marcha al Centro desde tu nueva base (m:ss).', ctrMarErr:'Escribe un tiempo de marcha, por ejemplo 0:42.', ctrWaitSub:'Marcha al Centro {m} · el admin te dirá cuándo empezar', ctrGoT:'¡INICIA YA!', ctrGoSub:'alerta hace {s}', ctrGoTap:'Inicia tu contra-rally en el Centro ahora y luego toca abajo', ctrStarted:'Ya inicié el rally', say_ctrGo:'Inicia tu contra-rally ahora', ctrAbortT:'ABORTAR', ctrAbortSub:'Disuelve tu contra-rally en el juego ahora', say_ctrAbort:'Aborta, disuelve tu contra-rally', ctrHoldT:'MANTÉN EL CENTRO', ctrHoldSub:'Quédate en el Centro como defensor hasta que lleguen las marchas de DTF; luego expulsa a todos los defensores para devolver el Centro.', ctrHandT:'EXPULSA YA', ctrHandSub:'Llegaron las marchas de DTF: expulsa a todos los defensores para devolver el Centro.', say_ctrHand:'Devuelve el Centro, expulsa a los defensores ya', ctrDone:'Listo · volver a DTF', ctrBack:'Volver a DTF', ctrNewMar:'Tu base se movió: escribe tus nuevos tiempos de marcha.', ctrAdmHdr:'Contraataque ({n})', ctrNone:'Aún no hay contraatacantes.', ctrRallying:'en rally', ctrGoBtn:'INICIAR CONTRA', ctrAbBtn:'ABORTAR CONTRA', ctrHandBtn:'Devolver', ctrAbQ:'¿Decir a los contraatacantes que disuelvan su rally?', ctrSent:'Contraatacantes avisados.', ctrStGo:'alerta enviada hace {s}', ctrStAbort:'aborto enviado hace {s}', ctrStHand:'devolución enviada hace {s}', ctrTag:'CONTRA', ctrLand:'impacto {s}', ctrEarly:'muy pronto', ctrTight:'justo', ctrGood:'bien', ctrLate:'tarde', ctrOnlyThem:'Solo el contraatacante corrige esta marcha.', tdlHdr:'Líder de defensa de torres', tdlPick:'ELIGE ATAQUE', tdlPickSub:'Toca un ataque verde para tomarlo y corre hacia allí', tdlBeIn:'llega antes de · impacto en {l}', tdlLands:'impacto en · toma el mando de la defensa', tdlDrop:'Soltar', tdlTaken:'Otro líder tomó ese ataque.', tdlGone:'Se quitó el ataque a {t}: toma terminada.', say_tdlIn:'Llega ya', say_tdl:'Eres líder de defensa de torres', tdlYou:'El admin te nombró líder de defensa de torres.', tdlOff:'Ya no eres líder de defensa de torres.', tdlAdmHdr:'Líderes de defensa de torres ({n}/{m})', tdlNoLeads:'No hay líderes de rally para elegir.', roleTdl:'Líder de defensa de torres', skBtn:'Skin', skHdr:'Skin', skUpload:'Subir archivo de skin', skEdit:'Crear la mía', skEditClose:'Cerrar editor', skAi:'Prompt de IA', skDownload:'Descargar skin', skDefault:'Skin predeterminada', skNow:'Actual: {n}', skOffNow:'skins desactivadas en esta visita (skin=off)', skRadius:'Esquinas', skSt_flat:'Plana', skSt_gradient:'Degradado', skSt_bevel:'Metal', skSt_glow:'Brillo', skSt_storm:'Tormenta', skF_system:'Fuente estándar', skF_rounded:'Fuente redondeada', skF_serif:'Fuente con serifa', skF_mono:'Fuente de máquina', skF_condensed:'Fuente estrecha', skWall:'Imagen de fondo', skNoWall:'Sin fondo', skDim:'Oscurecer', skName:'Nombre de la skin', skSave:'Guardar skin', skSaved:'Skin guardada en este dispositivo.', skLoaded:'Skin «{n}» cargada.', skDefOk:'Skin predeterminada (MAD OPS) activada.', sk_bg:'Página', sk_pan:'Paneles', sk_bd:'Bordes', sk_tx:'Texto', sk_mu:'Texto pequeño', sk_am:'Acento', skTx:'el texto', skPan:'los paneles', skBg:'la página', skMu:'el texto pequeño', skAm:'el acento', skErrFile:'Eso no es un archivo de skin de MAD OPS.', skErrColor:'El color «{k}» debe ser como #12ab34.', skErrWall:'El fondo debe ser una imagen.', skErrCon:'Difícil de leer: {a} sobre {b}. Elige colores más distintos.', skErrAm:'El acento es demasiado oscuro para el texto de los botones. Elige uno más claro.', skErrSpace:'No hay espacio suficiente en este dispositivo para guardar la skin.', skAiHow:'Copia esto, cambia la parte entre [corchetes] por tu idea y pégalo en cualquier chat de IA. Guarda su respuesta como archivo .json y súbelo aquí.', betaTitle:'BETA EN VIVO', betaSub:'Versión {v} · esta batalla es una prueba en vivo de funciones nuevas. Algo puede fallar: sigue jugando y ayúdanos a encontrar los problemas.', betaNewHdr:'Para probar', betaN1:'Contra-rally: cuando DTF tiene el Centro, toca Centro → Contraataque.', betaN2:'Líderes de defensa de torres: el admin elige a los líderes más fuertes para correr de torre en torre.', betaN3:'Proporciones guardadas: cada proporción muestra su nombre (Ataque 1, Defensa 2, Personalizada).', betaN4:'ENVÍA YA · ACELERA cuando un ataque está demasiado cerca para un envío normal.', betaN5:'Skins: toca Skin para cambiar el aspecto. Skin predeterminada, abajo, lo restablece.', betaRepHdr:'Si algo falla', betaR1:'Toca Reportar un problema (debajo de Salir y empezar de nuevo) cuanto antes. La app guarda lo que muestra tu pantalla.', betaR2:'Escribe unas palabras: qué hacías y qué esperabas, por ejemplo «me uní a VX, no salió ¡ÚNETE YA!».', betaR3:'Sigue jugando. Si los temporizadores parecen mal, sigue a los líderes en el chat.', betaR4:'Después de la batalla, cuéntale al admin todo lo que recuerdes. El admin reúne todos los reportes.', betaFoot:'Gracias por ayudar a probar MAD OPS.', betaOk:'Acepto', betaLink:'Info beta', tipNoMore:'No volver a mostrar', tip_lead_t:'Líder de rally', tip_lead:'Diriges los rallies de ataque en este objetivo. Ya estás disponible para un rally de grupo: el admin elige líderes y lanza el control de listos. Elige Rally solo si vas a iniciar el tuyo. En Mi proporción puedes darle a tu rally su propia proporción de tropas.', tip_solo_t:'Rally solo', tip_solo:'Tú inicias este rally. Elige una proporción, toca INICIAR cuando empieces el rally en el juego y escribe el temporizador del juego para sincronizar. Tus miembros siguen tus temporizadores. Cancelar rally lo detiene y les avisa.', tip_join_t:'Unirse a un rally', tip_join:'Sigues a un líder de rally. Colores en el mapa: verde = aún no marcha, amarillo parpadeante = marcha en 20 s, rojo parpadeante = en 5 s, rojo = marchando. Cuando tu líder inicia, aparece ¡ÚNETE YA! con la proporción: únete en el juego.', tip_def_t:'Defensa', tip_def:'Cuando el admin sincroniza un ataque entrante, recibes un temporizador de envío según tu propia marcha, para que tus refuerzos lleguen justo después. Si un ataque está demasiado cerca, ves ENVÍA YA · ACELERA con cuánto acelerar.', tip_ctr_t:'Contraataque', tip_ctr:'Atacas el Centro desde una alianza aliada para llegar justo después de un fuerte ataque enemigo, sobre defensores enemigos debilitados. El admin te dice cuándo empezar. Si funciona, mantienes el Centro hasta que lleguen las marchas de DTF y luego lo devuelves.', tip_tdl_t:'Líder de defensa de torres', tip_tdl:'Corres de torre en torre para tomar el mando de la defensa antes de cada impacto. Los ataques verdes son los siguientes por cubrir. Tomar uno lo bloquea para el otro líder. «Llega antes de» es 10 s antes del impacto.', tip_ratio_t:'Proporciones guardadas', tip_ratio:'Elige una proporción con nombre que el admin preparó antes de la pelea, o Personalizada para escribir la tuya. Todo el rally ve el nombre con los números. Tocar los números cambia a Personalizada.', tip_skin_t:'Skins', tip_skin:'Cambia el aspecto de la app en este dispositivo: elige una skin incluida, crea la tuya o carga el archivo de un amigo. Los colores de rally y de alerta nunca cambian. Skin predeterminada, al final de la página, siempre restablece el aspecto normal.', tip_compact_t:'Vista compacta', tip_compact:'Muestra solo la caja de temporizadores con botones grandes, para una ventana flotante o pantalla dividida junto al juego. Vista completa vuelve a mostrar la página.', tip_pop_t:'Superposición', tip_pop:'Pone la caja de temporizadores en una ventanita sobre el juego. En PC los botones funcionan ahí; en el teléfono es una imagen de la caja.', tip_report_t:'Reportar un problema', tip_report:'Guarda lo que muestra tu pantalla y lo que hacía la app, con tu nota, para el admin. Úsalo en cuanto algo parezca mal y sigue jugando.', tip_help_t:'Pedir ayuda', tip_help:'Pide ayuda a los admins con tu rally. El primer admin que responda puede sincronizar y ajustar tus temporizadores por ti.', tip_admAtk_t:'Rallies de grupo', tip_admAtk:'Aparecen todos los líderes que no están en solo. Toca los que quieras, ajusta su orden y proporción y luego INICIAR RALLY DE GRUPO. Los líderes tocan LISTO y la cuenta atrás empieza sola.', tip_admDef_t:'Ataques entrantes', tip_admDef:'Sincroniza cada ataque enemigo con el temporizador del juego. Los defensores de este objetivo reciben temporizadores según su propia marcha. La marcha de un enemigo nuevo es una estimación de 30 s hasta que la ajustes en vivo. Aquí también se fija la proporción de defensa.', tip_admCtr_t:'Contraataque', tip_admCtr:'Aquí aparecen los contraatacantes. Toca INICIAR CONTRA cuando aparezca un ataque enemigo fuerte, ABORTAR CONTRA para cancelarlo durante la reunión y Devolver cuando las marchas de DTF lleguen al Centro. Sincroniza su rally desde la etiqueta azul CONTRA.', tip_admTdl_t:'Líderes de defensa de torres', tip_admTdl:'Elige hasta 2 líderes de rally fuertes para correr entre torres. Ven los próximos ataques por cubrir y los toman, uno por torre.', tip_admRp_t:'Proporciones guardadas', tip_admRp:'Nombra y fija las proporciones antes de la pelea. Todos las eligen de una lista: menos escritura en batalla.', tip_admRep_t:'Reportes de problemas', tip_admRep:'Los reportes enviados durante la batalla, con lo que mostraba la pantalla. Copiar todo y pégalo para Claude.', tutLater:'El tutorial volverá en una próxima actualización.', betaAgree:'Al usar MAD OPS aceptas no compartirlo con nadie fuera de DTF o ROS.', refHdr:'Enlaces compartidos', refLine:'trajo a {k}:', refNone:'Nadie ha entrado todavía por un enlace compartido.', refNoTag:'Abierto sin enlace identificado: {k}', refUnknown:'enlace desconocido {c}', shareBtn:'Copiar enlace para un compañero', shareNeedName:'Guarda primero tu nombre en el juego.', shareText:'MAD OPS: temporizador de rallies DTF/ROS. No compartir fuera de DTF o ROS.', shareDone:'Compartido. Solo compañeros de DTF o ROS, por favor.', shareCopied:'Enlace copiado. Envíalo solo a un compañero de DTF o ROS.', nbBtn:'REINICIAR PARA NUEVA BATALLA', nbQ:'Escribe RESET para empezar una batalla nueva. Todos vuelven a escribir sus tiempos de marcha (los nombres se conservan). Se borran ataques, rallies, objetivos tomados, enemigos guardados, contraataques y torres tomadas.', nbNo:'No se reinició: no escribiste RESET.', nbSent:'Reinicio enviado a todos.', nbNeedCtl:'Solo el admin con el control puede reiniciar.', nbDone:'Batalla nueva: todo se reinició. Escribe tus tiempos de marcha.', shareFail:'No se pudo copiar el enlace. Inténtalo de nuevo.', notAdmin:'Esta cuenta no está en la lista de admins. Pide al propietario que la añada en la sección Admins.', notAdminErr:'Sesión iniciada, pero esta cuenta no está en la lista de admins. Pide al propietario que la añada.', tooMany:'Demasiados intentos. Espera un rato (hasta una hora) y vuelve a intentarlo.', admHdr:'Admins', admHow:'Crea la cuenta en Firebase Authentication (correo y contraseña) y luego añade el correo aquí. Los propietarios (★) pueden cambiar esta lista.', admFixed:'Los admins incluidos en las reglas de seguridad no se muestran aquí.', admOwner:'propietario', admOwnerTip:'Los propietarios pueden añadir y quitar admins', admAdd:'Añadir admin', admBad:'Escribe un correo completo.', admHave:'Ese correo ya es admin.', admRmQ:'¿Quitar a {e} de los admins?', admSaved:'Lista de admins guardada.', admFail:'No se pudo guardar. Solo los propietarios pueden cambiar la lista (publica primero las nuevas reglas).', helpBtn:'? Ayuda', helpTitle:'AYUDA DE MAD OPS', helpClose:'Cerrar', helpWhatH:'¿Qué es MAD OPS?', helpWhat1:'MAD OPS es el temporizador de batalla de DTF para las peleas de Supreme Prison y SvS. Sigues jugando en el juego: MAD OPS te dice exactamente cuándo iniciar, unirte o enviar, para que las marchas de todos lleguen juntas.', helpWhat2:'El objetivo: no más cuentas atrás en el chat. El admin dirige la pelea desde una sola pantalla, el reloj de cada teléfono se ajusta a ella, y tu pantalla solo muestra lo que tienes que hacer a continuación. Así DTF golpea más fuerte y defiende mejor.', helpBetaH:'¿Qué es una beta en vivo?', helpBeta1:'Una beta es una versión de prueba. Esta es una pelea real, pero algunas funciones de la app se usan en batalla por primera vez, así que algunas cosas pueden no funcionar perfectamente.', helpBeta2:'Si algo parece estar mal, sigue jugando y sigue a los líderes en el chat. Cuando puedas, toca Reportar un problema (junto a Salir y empezar de nuevo) para que el admin lo arregle.', helpStartH:'Para empezar', helpS1:'Arriba en la pantalla, elige tu idioma y toca el botón de sonido hasta que diga Sonido activado, para oír los avisos.', helpS2:'Escribe tu nombre en el juego y tu tiempo de marcha a cada uno de los cinco objetivos en minutos:segundos (por ejemplo 0:42), y toca Guardar. El juego muestra el tiempo de marcha cuando envías tropas a un objetivo.', helpS3:'En el mapa, toca el objetivo al que te dicen que vayas.', helpS4:'Elige tu rol. Si DTF ya tiene ese objetivo, quedas asignado a defenderlo.', helpBoxH:'Mira el cuadro grande', helpBox:'El cuadro grande de arriba siempre te dice qué hacer ahora mismo. EN ESPERA significa esperar. Cuando se pone verde, actúa en el juego de inmediato.', helpRolesH:'Roles sencillos', helpJoin:'Participante (UNIRSE): toca el símbolo del líder de rally al que te unes y espera. Cuando el cuadro se pone verde y dice ¡ÚNETE YA!, únete a ese rally en el juego con la proporción de tropas que muestra.', helpDef:'Defensor: refuerzas un objetivo que tiene DTF. Cuando el temporizador llega a cero y el cuadro dice ENVÍA, envía tus refuerzos en el juego. ENVÍA YA · ACELERA significa enviar de inmediato y acelerar tu marcha.', helpLead:'Líder de rally (LÍDER): para jugadores con experiencia. Un consejo corto lo explica la primera vez que lo eliges.', helpBtnsH:'Botones útiles', helpB1:'Mostrar superposición: una pequeña ventana con el temporizador encima del juego.', helpB2:'Mantener pantalla encendida: evita que la pantalla se apague.', helpB3:'Vista compacta: solo el cuadro del temporizador, para pantalla dividida junto al juego.', helpB4:'Salir y empezar de nuevo: quita tu rol para que elijas otro. Tu nombre se mantiene, y te pregunta si quieres conservar tus tiempos de marcha.', helpAsk:'¿Aún con dudas? Pregunta en el chat de la alianza. Ante la duda, sigue a los líderes en el juego.', helpTips:'Ver los consejos otra vez', helpTipsOk:'Los consejos volverán a aparecer al usar cada función.', betaHelp:'¿Nuevo en MAD OPS? Toca ? Ayuda arriba en la pantalla para una guía rápida.', helpSyncH:'Lo que mantiene sincronizado', helpSync1:'Rallies: cada líder de rally recibe su propio momento de inicio, calculado según su marcha, para que los rallies de bases distintas golpeen el objetivo a la vez.', helpSync2:'Participantes: se te avisa en cuanto se abre el rally de tu líder, para que se llene a tiempo.', helpSync3:'Defensa: tu momento de envío se calcula con tu propio tiempo de marcha, para que tus refuerzos lleguen justo después de cada golpe enemigo.', helpSync4:'Avisos: los mensajes y avisos de voz del admin llegan a todos en el mismo momento.'
},
ar: {
 chooseFile:'اختيار ملف', fileTooBig:'الملف كبير جداً. استخدم مقطعاً أصغر من 700 كيلوبايت.', fileBad:'تعذّر تشغيل هذا الملف. استخدم mp3 أو m4a أو wav.', fileSaving:'جارٍ الحفظ…', builtIn:'مدمج', clipHint:'اختر ملفاً صوتياً قصيراً لكل زر صوت. صوت العد التنازلي مدمج في التطبيق.',
 updBtn:'تحديث', noteEnemyName:'اكتب أو اختر اسم العدو أولاً.', enemySaved:'تم حفظ {n} عند {t}', msgHdr:'الرسائل', msgTo:'إلى', audAll:'الجميع', audLeads:'كل قادة التجمع', audJoiners:'كل المنضمين', audLead:'القائد {s}', audRally:'المنضمون إلى {s}', msgPh:'اكتب رسالة', sendBtn:'إرسال', msgB1:'استعد لبدء تجمعك', msgB2:'استعد للدفاع', msgSent:'أُرسلت إلى {a}: {m}', msgEmpty:'اكتب رسالة أولاً.', msgClose:'إغلاق الرسالة', editPresets:'تعديل الأزرار', doneEdit:'إنهاء التعديل', savePresets:'حفظ الأزرار', presetsSaved:'تم حفظ الأزرار', textBtns:'أزرار النص', voiceBtns:'أزرار الصوت', cdClips:'صوت العد التنازلي', labelPh:'التسمية', textPh:'الرسالة', recBtn:'تسجيل', stopBtn:'إيقاف', playBtn:'تشغيل', delBtn:'حذف', noClip:'لا يوجد تسجيل', hasClip:'تم التسجيل', voiceN:'صوت {n}', micErr:'الميكروفون غير متاح: {m}', clipSaved:'تم حفظ التسجيل', clipEmpty:'لم يُسجَّل شيء. حاول مرة أخرى.', clipDelQ:'هل تريد حذف هذا التسجيل؟', voiceNoClip:'سجّله أولاً.', voiceDev:'الصوت: الجهاز', voiceRec:'الصوت: مسجَّل', voiceNone:'لا توجد تسجيلات بعد. يُستخدم صوت الجهاز.', voiceNeedSound:'فعّل الصوت لسماع التسجيلات.', voiceSent:'أُرسل الصوت إلى {a}: {m}', voiceHint:'أزرار الصوت تُسمع فقط لدى اللاعبين الذين اختاروا الصوت المسجَّل.',
 tutBtn:'الدليل التعليمي', tutNote:'تدريب فقط. لا يُرسل شيء إلى فريقك.', tutMenu:'اختر تدريباً', tutLeadBtn:'قائد التجمع', tutJoinBtn:'منضم', tutDefBtn:'الدفاع', tutStepN:'الخطوة {n} من {m}', tutNext:'التالي', tutExit:'إنهاء الدليل', tutOpen:'جاهز: افتح النافذة العائمة', tutCont:'متابعة', tutAgain:'تدرّب مرة أخرى', tutToMenu:'القائمة', tutSound:'تفعيل الصوت', tutAdmin:'سجّل الخروج من وضع المسؤول قبل بدء الدليل.', tutTeam:'إرسال الفريق', tutSwitch:'انتقل إلى لعبتك', tutStartIn:'يبدأ قريباً', tutRetLbl:'أحسنت!', tutRetTime:'عُد', tutRetSub:'عُد إلى الدليل', tutRetSay:'أحسنت. عُد إلى الدليل.', sL1:'أنت قائد التجمع VX. زميلان، AB وKT، يتم تمثيلهما تلقائياً. الدليل يؤدي دور المسؤول.', sL2:'اضغط قائد في المربع أدناه.', sL3:'تم ملء الرمز ووقت المسير مسبقاً (VX، 0:50). تحقق منهما واضغط موافق.', sL4:'انتظر: لم يؤكد المسؤول القادة بعد. اضغط التالي ليؤكد المسؤول.', sL5:'استعداد: تم تثبيت القادة. اضغط التالي لبدء فحص الجاهزية.', sL6:'فحص الجاهزية! اضغط زر جاهز الأخضر في المربع أدناه.', sL7:'الجميع جاهزون. سيبدأ المسؤول العد التنازلي الآن. اضغط الزر، ثم انتقل إلى لعبتك وراقب النافذة العائمة.', sRun:'انتقل إلى لعبتك الآن. تعد النافذة العائمة 3 و2 و1، ثم تعرض مؤقت انطلاقك وتومض بكلمة أرسل. ستخبرك متى تعود. إذا لم تفتح، راقب المربع أدناه.', sL9:'كان ذلك تجمعاً كاملاً. انطلق AB أولاً لتصل كل التجمعات معاً. على الهاتف، اضغط جاهز داخل التطبيق قبل فتح النافذة العائمة.', sJ1:'أنت منضم إلى التجمع. أربعة قادة (AB وKT وQZ وVX) يتم تمثيلهم تلقائياً. الدليل يؤدي دور المسؤول والقادة.', sJ2:'اضغط انضمام في المربع أدناه.', sJ3:'انتظر: لم يؤكد المسؤول القادة بعد. اضغط التالي ليؤكد المسؤول.', sJ4:'اختر تجمعك: اضغط رمز القائد الذي ستنضم إليه.', sJ5:'أدخل وقت مسيرك (معبأ مسبقاً 0:41) واضغط موافق.', sJ6:'استعداد: لا شيء للضغط عليه. اضغط التالي لبدء فحص الجاهزية.', sJ7:'سيبدأ العد التنازلي. اضغط الزر وانتقل إلى لعبتك وراقب. عندما ينطلق قائدك تتحول النافذة إلى الأخضر: بدأ التجمع، انضم الآن.', sJ9:'أحسنت. عندما ترى بدأ التجمع، انضم إلى ذلك التجمع في اللعبة.', sD1:'الفريق نفسه (AB وKT وQZ وVX) يدافع معك. حوّل المسؤول إلى وضع الدفاع.', sD2:'اكتب وقت مسيرك إلى المركز، 0:36، واضغط موافق.', sD3:'يقترب هجوم واحد. يرسل الجميع لتصل التعزيزات بعد الضربة بـ 0.4 ثانية. اضغط الزر وانتقل إلى لعبتك وأرسل عندما يصل المؤقت إلى الصفر.', sD6:'الآن تصل ثلاث هجمات متقاربة. الرقم الصغير هو عدد مرات الإرسال المتبقية لك. التوهج الأحمر يعني أن هجومين يصلان خلال ثانية من بعضهما، فترسل مرتين تقريباً في الوقت نفسه. يحل كل مؤقت محل السابق تلقائياً.', sD9:'أصبحت قادراً على الدفاع. إذا بدأت متأخراً فسرّع مسيرك في اللعبة. بعد آخر إرسال راجع نسب القوات.',
 ginPh:'الاسم داخل اللعبة', nameNeeded:'أدخل اسمك داخل اللعبة', ctlYou:'لديك التحكم', ctlView:'للعرض فقط · {n} لديه التحكم', ctlNone:'لا أحد لديه التحكم بعد', adminsHere:'المسؤولون الحاضرون', reqBtn:'طلب التحكم', reqSent:'تم إرسال الطلب', reqQueue:'الترتيب {p} في الانتظار', reqCancel:'إلغاء', reqRow:'{n} يطلب التحكم', xferBtn:'نقل التحكم', declBtn:'رفض', ctlGained:'أصبح لديك التحكم الآن', ctlLost:'انتقل التحكم إلى {n}', ctlDeclined:'تم رفض طلبك', ctlExpired:'انتهت صلاحية طلبك', ctlNoReq:'هذا الطلب لم يعد موجوداً', viewNote:'يمكن فقط للمسؤول الذي لديه التحكم تغيير هذه الإعدادات. ما زال بإمكانك استخدام مربع قائد أو انضمام.',
 emailPh:'البريد الإلكتروني للمسؤول', badLogin:'البريد الإلكتروني أو كلمة المرور غير صحيحة', errEmailOff:'فعّل تسجيل الدخول بالبريد وكلمة المرور في Firebase Authentication.',
 back:'↪', language:'اللغة', live:'متصل', offline:'غير متصل', connecting:'جارٍ الاتصال…', room:'الغرفة', clockPill:'الساعة ±{n} مللي ث', clockNone:'الساعة --',
 soundOff:'الصوت متوقف', soundOn:'الصوت مفعّل', popBtn:'عرض النافذة العائمة', wakeBtn:'إبقاء الشاشة مضاءة', wakeOn:'الشاشة مضاءة', popPreview:'معاينة النافذة العائمة', adminLink:'المسؤول',
 resetMe:'↺ المغادرة والبدء من جديد', resetConfirm:'هل تريد المغادرة ومسح دورك ورمزك ووقت مسيرك؟', marchTarget:'وقت المسير إلى الهدف', marchCenter:'وقت المسير إلى المركز',
 roleLead:'قائد التجمع {sym}', roleJoin:'منضم إلى التجمع', noRole:'لا يوجد دور بعد', adminSuffix:' · مسؤول',
 errRules:'منع Firestore الطلب. تحقق من قواعد الأمان.', errAuth:'فعّل تسجيل الدخول المجهول في Firebase Authentication.', errGeneric:'خطأ: {m}',
 noteMarchFirst:'أدخل وقت المسير أولاً.', noteConfirmFirst:'أكّد القادة أولاً.', noteNoLeaders:'لا يوجد قادة بعد.', noteTypeTimer:'اكتب المؤقت الظاهر في اللعبة.',
 noteLimit:'الحد الأقصى ست هجمات. احذف واحدة أولاً.', noteTaken:'مسؤول آخر نشط.', noteTookOver:'تولى مسؤول آخر المهمة.',
 noteWakeNo:'إبقاء الشاشة مضاءة غير مدعوم هنا.', noteWakeRef:'رُفض إبقاء الشاشة مضاءة: {m}', notePopRef:'رُفضت النافذة العائمة: {m}', notePopTap:'رُفضت النافذة العائمة: {m} اضغط مرة أخرى.', notePopNone:'هذا المتصفح لا يدعم النافذة العائمة.',
 chooseRole:'اختر دورك', lead:'قائد', join:'انضمام', leadEntry:'قائد التجمع · الرمز + وقت المسير', symErr:'يجب أن يتكون الرمز من حرفين', marErr:'أدخل وقت المسير', symTaken:'الرمز مستخدم',
 ok:'موافق', editBtn:'↪ تعديل', waitingAdmin:'بانتظار المسؤول', standingBy:'في الانتظار', wait:'انتظر', standby:'استعداد', readyCheck:'فحص الجاهزية', ready:'جاهز', readyDone:'جاهز ✓',
 waitOthers:'بانتظار الآخرين', notInOp:'لست ضمن هذه العملية', missed:'فاتك', waitNext:'انتظر العملية التالية', cdLabel:'يبدأ مؤقت التجمع خلال', launchIn:'{sym} الانطلاق خلال',
 send:'أرسل', rallyRunning:'التجمع جارٍ', launched:'انطلق', doneLbl:'انتهى', DONE:'تم', waitAdminSub:'انتظر المسؤول', joinWait:'بانتظار القادة', pickRally:'اختر تجمعك',
 joiningMarch:'الانضمام إلى {sym} · وقت مسيرك', joining:'الانضمام إلى {sym}', rallyNot:'لم يبدأ التجمع بعد', rallyStarted:'بدأ التجمع', joinNow:'انضم الآن', readyQ:'جاهز؟',
 marchSub:'المسير {t}', changeBtn:'↪ تغيير', cdSub:'يبدأ التجمع', say_send:'أرسل', say_join:'بدأ التجمع. انضم الآن.', say_sound:'الصوت مفعّل',
 centerMarch:'مسير المركز {t}', defense:'الدفاع', sendIn:'{l} · الإرسال خلال', thenGap:' · ثم {s} ث', allSent:'تم إرسال الكل', checkRatios:'راجع نسب القوات', editMarch:'✎ وقت المسير',
 modeChange:'تغيير الوضع', modeDef:'الدفاع', modeAtk:'الهجوم',
 admin:'المسؤول', logout:'تسجيل الخروج', tabAtk:'1 · هجوم التجمع', tabDef:'2 · الدفاع', modeConfirm:'التبديل إلى وضع {m}؟ سيتلقى جميع اللاعبين إشعاراً. تُحفظ الأدوار وأوقات المسير.',
 modeNameAtk:'هجوم التجمع', modeNameDef:'الدفاع', pw:'كلمة مرور المسؤول', login:'دخول', wrongPw:'كلمة المرور خاطئة',
 leadersJoiners:'القادة {a} · المنضمون {b}', confirmLeaders:'تأكيد القادة', leadersLocked:'تم قفل القادة',
 hitOrder:'ترتيب الضربات · الضربة الأولى في الأعلى', joinedN:'انضم {n}', noLeadersMsg:'لا يوجد قادة بعد. شارك الرابط واطلب من القادة اختيار قائد.', leadBuffer:'مهلة البدء',
 readyCheckBtn:'فحص الجاهزية', startNow:'ابدأ الآن', reset:'إعادة ضبط', resetOpConfirm:'إعادة ضبط العملية؟ يعود القادة والمنضمون ويُدخلون بياناتهم من جديد.',
 offsetsNote:'الفروق: 0.1 ث بين التجمعات، والأخير +0.4 ث. غيّرها بـ − و +.', startsT:'يبدأ {t}', tMinus:'T−{t}', launchedLbl:'انطلق',
 stStarting:'البدء خلال {n}', stRunning:'العملية جارية', stReadyWait:'فحص الجاهزية: بانتظار القادة', stConfirmed:'تم تأكيد القادة', stCollecting:'جارٍ جمع القادة', moveUp:'أعلى', moveDown:'أسفل',
 known:'الأعداء المعروفون · اضغط للتعبئة', knownNone:'لا يوجد بعد. الأسماء الجديدة تبدأ من 0:30.', newAttack:'هجوم جديد', namePh:'الاسم', marchWord:'المسير', rally5:'تجمع 5:00', alreadyMarching:'يسير بالفعل',
 timerInGame:'مؤقت اللعبة', syncBtn:'مزامنة', resyncBtn:'إعادة مزامنة', timeline:'الجدول الزمني', noAttacks:'لا توجد هجمات قادمة.', landPlus:'الوصول +', gapLbl:'الفارق {a} → {b} {s} ث',
 clearAll:'مسح الكل', clearAllConfirm:'هل تريد مسح كل الهجمات القادمة؟', rallyW:'تجمع', marchW:'مسير', landedW:'وصل', removeBtn:'إزالة',
 resetDef:'إعادة ضبط الدفاع', resetDefConfirm:'إعادة ضبط الدفاع؟ سيُمسح كل الهجمات وشريط المزامنة. يبقى الأعداء المعروفون.', forgetAll:'نسيان الكل', forgetAllConfirm:'هل تريد نسيان كل الأعداء المعروفين؟', forgetOne:'نسيان {n}',
 profHdr:'ملفك الشخصي', namePh2:'الاسم في اللعبة', nameReq:'أدخل اسمك في اللعبة.', marHdr:'زمن المسير إلى كل هدف', marReq:'أدخل أزمنة المسير الخمسة.', tC:'الوسط', tN:'الشمال', tS:'الجنوب', tE:'الشرق', tW:'الغرب', saveProf:'حفظ', editProf:'تعديل الملف', profSaved:'تم حفظ الملف', pickTarget:'اختر هدفًا على الخريطة', mapHdr:'الأهداف', defBadge:'دفاع', chooseAct:'{t} · اختر دورك', defendAnyway:'دافع على أي حال', leave:'↺ مغادرة هذا الهدف', meLine:'{n} · {t} · {r}', meNone:'{n} · بلا هدف', roleLeadSym:'قائد {s}', roleJoinOf:'منضم إلى {s}', roleDef:'مدافع', joinedList:'انضم: {n}', nobodyJoined:'لم ينضم أحد بعد', symEntry:'{t} · رمزك من حرفين', groupBtn:'حشد جماعي', soloBtn:'حشد فردي', chooseMode:'{t} · {s} · جماعي أم فردي؟', unregister:'إلغاء التسجيل', grpNotCalled:'بانتظار أن يستدعي المسؤول المجموعة', grpReset:'أُعيد ضبط المجموعة', rejoin:'العودة إلى المجموعة', soloRatio:'{t} · {s} · نسبة القوات', startBtn:'ابدأ', ratioErr:'أدخل نسبة قوات مجموعها 100.', ratioPh:'حملة الدروع/القاذفون/الرماة', troops:'القوات {r}', gathering:'{t} · {s} يتجمّع', gatheringEst:'{t} · {s} يتجمّع (تقدير)', syncGather:'مزامنة', gatherPh:'المؤقت', syncedOk:'تمت المزامنة', estTag:'تقدير', prepReinforce:'استعد للتعزيز', verifying:'التحقق من النجاح', winBtn:'نجح الهجوم', failBtn:'فشل الهجوم', say_reinforce:'استعد للتعزيز', say_verify:'جارٍ التحقق من النجاح', say_disband:'تم حل الحشد', say_defense:'التحويل إلى الدفاع', pickLead:'{t} · اختر حشدًا', noLeadsHere:'لا يوجد قادة حشد في {t} بعد', joiningSym:'{t} · منضم إلى {s}', disbanded:'تم حل الحشد', pickAgain:'اختر حشدًا آخر', defending:'{t} · دفاع', noIncoming:'لا هجمات قادمة بعد', nowDef:'{t} الآن في وضع الدفاع. إن لم تكن مدافعًا فاختر دورًا آخر.', youDef:'أنت الآن تدافع عن {t}.', mgTarget:'إدارة الهدف', myTargetBtn:'هدفي', subAtk:'هجوم', subDef:'دفاع', grpHdr:'حشد جماعي', callGroup:'استدعاء المجموعة', endGroup:'إنهاء المجموعة', endGroupQ:'إنهاء المجموعة على {t}؟ يعود القادة إلى اختيار جماعي أو فردي.', setRatio:'تطبيق', ralliesHdr:'الحشود على {t}', noRallies:'لا توجد حشود جارية.', soloTag:'فردي', groupTag:'جماعي', ratioOv:'النسبة', phGather:'تجمّع {x}', phGatherEst:'تجمّع {x} (تقدير)', phMarch:'مسير {x}', phVerify:'تحقق', winQ:'تسجيل الهجوم على {t} ناجحًا؟ ينتقل كل المشاركين إلى الدفاع.', failQ:'تسجيل الهجوم على {t} فاشلًا؟', heldOn:'مسيطر عليه: نعم', heldOff:'مسيطر عليه: لا', defCount:'{n} مدافعون', audTgt:'الجميع على {t}', audOne:'{n}', audPlayers:'اللاعبون', audFilter:'تصفية الأسماء', dupMark:'⚠ مكرر', audLeadsGrp:'القادة', audRallies:'المنضمون للحشود', audGeneral:'عام', marNotOk:'⚠ المسير غير مؤكد · راقب اللعبة', marNotOkAdm:'⚠ المسير غير مؤكد', helpReqBtn:'طلب مساعدة', helpCancel:'إلغاء المساعدة', helpWaiting:'تم طلب المساعدة…', helpByLbl:'{n} يساعد', helpCallBtn:'مساعدة: {s} {n} · {t}', helpingBar:'مساعدة {s} على {t}', helpDone:'انتهت المساعدة', helpTaken:'مسؤول آخر يساعد بالفعل.', helpNote:'{n} يساعدك', helpRallyWait:'لم يبدأ الحشد بعد', helpCount:'طلبات المساعدة: {n}', msgB3:'الأكثر طلبًا للمساعدة', suckOne:'{n} الأسوأ!', suckTie:'{n} الأسوأ!', andWord:' و', noHelpYet:'لم يطلب أحد المساعدة بعد.', ctlOtherDev:'التحكم على جهازك الآخر', takeHere:'تولَّ التحكم على هذا الجهاز', wakeOk:'ستبقى الشاشة مضاءة ما دامت هذه الصفحة مفتوحة. اضغط مرة أخرى لإيقافه.', changeMode:'↪ جماعي/فردي', grpAvail:'متاح', grpAvailSub:'يمكن للمسؤول اختيارك لمجموعة', grpPicked:'تم اختيارك للمجموعة', soloQ:'حشد فردي؟', soloQSub:'تقوده بنفسك وتغادر قائمة المجموعة.', soloYes:'نعم، حشد فردي', soloNo:'إلغاء', backGroup:'↪ قائمة المجموعة', pickHint:'اضغط على القادة لاختيارهم للمجموعة:', pickLocked:'المجموعة جارية. أعد الضبط لتغيير القادة.', noAvail:'لا يوجد قادة على هذا الهدف بعد.', startGrp:'ابدأ الحشد الجماعي', noteSelFirst:'اختر قائدًا واحدًا على الأقل أولًا.', youDefNote:'أنت الآن تدافع عن {t}. لست مدافعًا في اللعبة؟ اضغط العودة إلى الهجوم.', notDefQ:'لست مدافعًا في اللعبة؟ اضغط العودة إلى الهجوم', backAtk:'↪ العودة إلى الهجوم', pickAtk:'اختر هدفًا للهجوم.', compactBtn:'عرض مضغوط', fullBtn:'عرض كامل', errConn:'خطأ في الاتصال. يرجى تحديث الصفحة.', resetConfirm2:'مغادرة دورك ورمزك الحاليين؟ يبقى اسمك محفوظًا.', keepMarQ:'الاحتفاظ بأزمنة المسير؟ في معركة جديدة تكون قاعدتك قد انتقلت غالبًا.', keepMar:'الاحتفاظ بالأزمنة', newMar:'إدخال أزمنة جديدة', marKept:'تم الاحتفاظ بأزمنة المسير.', newBattleQ:'هل هذه معركة جديدة؟ (آخر فتح منذ أكثر من 24 ساعة.)', newBattleYes:'نعم، معركة جديدة', newBattleNo:'لا، المعركة نفسها', vVol:'مستوى الصوت', rpLbl:'نسبة محفوظة', rpCustom:'مخصصة', rpSetBtn:'تطبيق', myRatio:'نسبتي', rpHdr:'النسب المحفوظة', rpName:'اسم النسبة', rpAdd:'+ إضافة نسبة', rpSave:'حفظ النسب', rpSaved:'تم حفظ النسب.', rpErr:'كل نسبة تحتاج اسمًا مختلفًا وثلاثة أرقام مجموعها 100 (10 نسب كحد أقصى).', defRatio:'نسبة الدفاع', ovClr:'استخدم نسبة المجموعة', rpSet:'النسبة: {r}', say_ready:'فحص الجاهزية', sameRatio:'النسبة نفسها لكل الحشود', leadOwn:'(اختيار القائد)', youTag:'أنت', lateHdr:'أرسل الآن · سرّع', lateSub:'مسيرك {m} · يصل خلال {l} · سرّع بمقدار {s}', say_late:'أرسل الآن، سرّع', cancelRally:'إلغاء الحشد', cancelQ:'إلغاء هذا الحشد؟ سيُبلَّغ المنضمون.', rallyCancelled:'تم إلغاء الحشد', cancelledSub:'انتظر حتى يبدأ القائد من جديد', say_cancelled:'تم إلغاء الحشد', verLbl:'الإصدار {v}', verNew:'يتوفر إصدار جديد من التطبيق.', verRefresh:'تحديث الآن', repBtn:'الإبلاغ عن مشكلة', repQ:'ما الذي حدث؟ (اختياري) يحفظ التطبيق أيضًا ما كانت تعرضه شاشتك.', repSent:'تم إرسال البلاغ. شكرًا.', repFail:'تعذّر إرسال البلاغ. يرجى تحديث الصفحة.', repHdr:'بلاغات المشاكل', repNone:'لا توجد بلاغات بعد.', repCopy:'نسخ', repCopyAll:'نسخ الكل', repClear:'حذف الكل', repClearQ:'حذف كل البلاغات؟', repCopied:'تم النسخ. الصقه لـ Claude.', repCopyManual:'انسخ هذا النص:', ctrRole:'هجوم مضاد', ctrPickSub:'DTF يسيطر على الوسط: دافع عنه، أو هاجم هجومًا مضادًا من تحالف حليف.', defendBtn:'دفاع', ctrHdr:'هجوم مضاد', ctrSwQ:'هل غيّرت التحالف؟', ctrSwSub:'أكّد أنك انتقلت إلى التحالف الحليف في اللعبة.', ctrSwYes:'نعم، انتقلت', ctrBmQ:'هل انتقلت قاعدتك؟', ctrBmSub:'هل انتقلت قاعدتك منذ التغيير؟', ctrBmNo:'لا، القاعدة نفسها', ctrBmYes:'نعم، انتقلت', ctrMarQ:'المسير إلى الوسط', ctrMarSub:'أدخل زمن مسيرك إلى الوسط من قاعدتك الجديدة (د:ث).', ctrMarErr:'أدخل زمن مسير مثل 0:42.', ctrWaitSub:'المسير إلى الوسط {m} · سيخبرك المسؤول متى تبدأ', ctrGoT:'ابدأ الآن', ctrGoSub:'تنبيه منذ {s}', ctrGoTap:'ابدأ حشدك المضاد على الوسط الآن، ثم اضغط أدناه', ctrStarted:'بدأت الحشد', say_ctrGo:'ابدأ حشدك المضاد الآن', ctrAbortT:'إلغاء', ctrAbortSub:'حلّ حشدك المضاد في اللعبة الآن', say_ctrAbort:'إلغاء، حلّ حشدك المضاد', ctrHoldT:'تمسّك بالوسط', ctrHoldSub:'ابقَ في الوسط مدافعًا حتى تصل مسيرات DTF، ثم اطرد كل المدافعين لتسليم الوسط.', ctrHandT:'اطرد الآن', ctrHandSub:'وصلت مسيرات DTF: اطرد كل المدافعين لتسليم الوسط.', say_ctrHand:'سلّم الوسط، اطرد المدافعين الآن', ctrDone:'تم · العودة إلى DTF', ctrBack:'العودة إلى DTF', ctrNewMar:'انتقلت قاعدتك: أدخل أزمنة المسير الجديدة.', ctrAdmHdr:'هجوم مضاد ({n})', ctrNone:'لا يوجد مهاجمون مضادون بعد.', ctrRallying:'يحشد', ctrGoBtn:'ابدأ المضاد', ctrAbBtn:'ألغِ المضاد', ctrHandBtn:'تسليم', ctrAbQ:'إبلاغ المهاجمين المضادين بحل حشدهم؟', ctrSent:'تم تنبيه المهاجمين المضادين.', ctrStGo:'أُرسل التنبيه منذ {s}', ctrStAbort:'أُرسل الإلغاء منذ {s}', ctrStHand:'أُرسل التسليم منذ {s}', ctrTag:'مضاد', ctrLand:'يصل {s}', ctrEarly:'مبكر جدًا', ctrTight:'ضيق', ctrGood:'جيد', ctrLate:'متأخر', ctrOnlyThem:'المهاجم المضاد وحده يصحح هذا المسير.', tdlHdr:'قائد دفاع الأبراج', tdlPick:'اختر هجومًا', tdlPickSub:'اضغط هجومًا أخضر لحجزه ثم أسرع إليه', tdlBeIn:'كن هناك قبل · يصل خلال {l}', tdlLands:'يصل خلال · تولَّ قيادة الدفاع', tdlDrop:'إلغاء الحجز', tdlTaken:'قائد آخر حجز هذا الهجوم.', tdlGone:'أُزيل الهجوم على {t}: انتهى الحجز.', say_tdlIn:'كن هناك الآن', say_tdl:'أنت قائد دفاع الأبراج', tdlYou:'عيّنك المسؤول قائدًا لدفاع الأبراج.', tdlOff:'لم تعد قائدًا لدفاع الأبراج.', tdlAdmHdr:'قادة دفاع الأبراج ({n}/{m})', tdlNoLeads:'لا يوجد قادة حشد للاختيار.', roleTdl:'قائد دفاع الأبراج', skBtn:'المظهر', skHdr:'المظهر', skUpload:'رفع ملف مظهر', skEdit:'اصنع مظهري', skEditClose:'إغلاق المحرر', skAi:'تعليمات للذكاء الاصطناعي', skDownload:'تنزيل ملف المظهر', skDefault:'المظهر الافتراضي', skNow:'الحالي: {n}', skOffNow:'المظاهر متوقفة في هذه الزيارة (skin=off)', skRadius:'الزوايا', skSt_flat:'مسطح', skSt_gradient:'متدرّج', skSt_bevel:'معدني', skSt_glow:'توهج', skSt_storm:'عاصفة', skF_system:'خط عادي', skF_rounded:'خط مستدير', skF_serif:'خط مذيّل', skF_mono:'خط الآلة الكاتبة', skF_condensed:'خط ضيق', skWall:'صورة الخلفية', skNoWall:'بلا خلفية', skDim:'تعتيم', skName:'اسم المظهر', skSave:'حفظ المظهر', skSaved:'تم حفظ المظهر على هذا الجهاز.', skLoaded:'تم تحميل المظهر «{n}».', skDefOk:'عاد المظهر الافتراضي (MAD OPS).', sk_bg:'الصفحة', sk_pan:'اللوحات', sk_bd:'الحدود', sk_tx:'النص', sk_mu:'النص الصغير', sk_am:'اللون المميز', skTx:'النص', skPan:'اللوحات', skBg:'الصفحة', skMu:'النص الصغير', skAm:'اللون المميز', skErrFile:'هذا ليس ملف مظهر لـ MAD OPS.', skErrColor:'يجب أن يكون اللون «{k}» مثل #12ab34.', skErrWall:'يجب أن تكون الخلفية صورة.', skErrCon:'صعب القراءة: {a} على {b}. اختر ألوانًا أكثر تباينًا.', skErrAm:'اللون المميز داكن جدًا لنص الأزرار. اختر لونًا أفتح.', skErrSpace:'لا توجد مساحة كافية على هذا الجهاز لحفظ المظهر.', skAiHow:'انسخ هذا، واستبدل الجزء بين [القوسين] بفكرتك، والصقه في أي محادثة ذكاء اصطناعي. احفظ الرد كملف .json وارفعه هنا.', betaTitle:'نسخة تجريبية مباشرة', betaSub:'الإصدار {v} · هذه المعركة اختبار مباشر لميزات جديدة. قد يتعطل شيء: تابع اللعب وساعدنا في إيجاد المشاكل.', betaNewHdr:'جديد للتجربة', betaN1:'الحشد المضاد: عندما يسيطر DTF على الوسط، اضغط الوسط ← هجوم مضاد.', betaN2:'قادة دفاع الأبراج: يختار المسؤول أقوى القادة للتنقل بسرعة من برج إلى برج.', betaN3:'النسب المحفوظة: كل نسبة تظهر الآن باسمها (هجوم 1، دفاع 2، مخصصة).', betaN4:'أرسل الآن · سرّع عندما يكون الهجوم أقرب من الإرسال العادي.', betaN5:'المظاهر: اضغط المظهر لتغيير الشكل. المظهر الافتراضي في الأسفل يعيده.', betaRepHdr:'إذا حدث خطأ', betaR1:'اضغط الإبلاغ عن مشكلة (تحت المغادرة والبدء من جديد) في أقرب وقت. يحفظ التطبيق ما تعرضه شاشتك.', betaR2:'اكتب بضع كلمات: ماذا كنت تفعل وماذا توقعت، مثل «انضممت إلى VX، لم يظهر انضم الآن».', betaR3:'تابع اللعب. إذا بدت المؤقتات خاطئة فاتبع القادة في الدردشة.', betaR4:'بعد المعركة أخبر المسؤول بكل ما تتذكره. المسؤول يجمع كل البلاغات.', betaFoot:'شكرًا لمساعدتك في اختبار MAD OPS.', betaOk:'أوافق', betaLink:'معلومات النسخة التجريبية', tipNoMore:'لا تعرض هذا مجددًا', tip_lead_t:'قائد الحشد', tip_lead:'تقود حشود الهجوم على هذا الهدف. أنت متاح فورًا لحشد جماعي: يختار المسؤول القادة ويبدأ فحص الجاهزية. اختر حشد فردي إن كنت ستبدأ حشدك بنفسك. في نسبتي يمكنك إعطاء حشدك نسبة قوات خاصة.', tip_solo_t:'حشد فردي', tip_solo:'تبدأ هذا الحشد بنفسك. اختر نسبة القوات، واضغط ابدأ عند بدء الحشد في اللعبة، ثم اكتب مؤقت اللعبة للمزامنة. يتبع المنضمون مؤقتاتك. إلغاء الحشد يوقفه ويبلغهم.', tip_join_t:'الانضمام إلى حشد', tip_join:'تتبع قائد حشد واحدًا. ألوان الحشود على الخريطة: أخضر = لم يسر بعد، أصفر وامض = يسير خلال 20 ث، أحمر وامض = خلال 5 ث، أحمر = يسير. عندما يبدأ قائدك يظهر انضم الآن مع النسبة: انضم في اللعبة.', tip_def_t:'الدفاع', tip_def:'عندما يزامن المسؤول هجومًا قادمًا تحصل على مؤقت إرسال حسب مسيرك، فتصل تعزيزاتك بعده مباشرة. إذا كان الهجوم أقرب من الإرسال العادي يظهر لك أرسل الآن · سرّع مع مقدار التسريع.', tip_ctr_t:'هجوم مضاد', tip_ctr:'تهاجم الوسط من تحالف حليف لتصل بعد هجوم عدو قوي مباشرة، على مدافعين أعداء منهكين. يخبرك المسؤول متى تبدأ. إن نجح تتمسك بالوسط حتى تصل مسيرات DTF ثم تسلّمه.', tip_tdl_t:'قائد دفاع الأبراج', tip_tdl:'تتنقل بسرعة من برج إلى برج لتتولى قيادة الدفاع قبل كل هجوم. الهجمات الخضراء هي التالية للتغطية. حجز هجوم يقفله على القائد الآخر. «كن هناك قبل» تعني قبل الوصول بـ 10 ث.', tip_ratio_t:'النسب المحفوظة', tip_ratio:'اختر نسبة قوات مسمّاة أعدها المسؤول قبل القتال، أو مخصصة لكتابة نسبتك. يرى كل الحشد الاسم مع الأرقام. الضغط على الأرقام يحوّل إلى مخصصة.', tip_skin_t:'المظاهر', tip_skin:'غيّر شكل التطبيق على هذا الجهاز: اختر مظهرًا جاهزًا، أو اصنع مظهرك، أو حمّل ملفًا أرسله صديق. ألوان الحشود والتنبيهات لا تتغير أبدًا. المظهر الافتراضي أسفل الصفحة يعيد الشكل العادي دائمًا.', tip_compact_t:'عرض مضغوط', tip_compact:'يعرض صندوق المؤقتات فقط بأزرار كبيرة، لنافذة عائمة أو شاشة مقسومة بجانب اللعبة. العرض الكامل يعيد الصفحة.', tip_pop_t:'النافذة العائمة', tip_pop:'يضع صندوق المؤقتات في نافذة صغيرة فوق اللعبة. على الكمبيوتر تعمل الأزرار فيها؛ على الهاتف هي صورة للصندوق.', tip_report_t:'الإبلاغ عن مشكلة', tip_report:'يحفظ ما تعرضه شاشتك وما كان التطبيق يفعله مع ملاحظتك للمسؤول. استخدمه فور أن يبدو شيء خاطئًا ثم تابع اللعب.', tip_help_t:'طلب مساعدة', tip_help:'يطلب من المسؤولين المساعدة في حشدك. أول مسؤول يستجيب يستطيع مزامنة مؤقتاتك وضبطها عنك.', tip_admAtk_t:'الحشود الجماعية', tip_admAtk:'يظهر كل قائد ليس في حشد فردي. اضغط القادة الذين تريدهم، واضبط ترتيبهم ونسبتهم، ثم ابدأ الحشد الجماعي. يضغط القادة جاهز ويبدأ العد التنازلي وحده.', tip_admDef_t:'الهجمات القادمة', tip_admDef:'زامن كل هجوم عدو من مؤقت اللعبة. يحصل مدافعو هذا الهدف على مؤقتات إرسال حسب مسيرهم. مسير العدو الجديد تقدير 30 ث حتى تضبطه مباشرة. اضبط نسبة الدفاع هنا أيضًا.', tip_admCtr_t:'هجوم مضاد', tip_admCtr:'يظهر المهاجمون المضادون هنا. اضغط ابدأ المضاد عند ظهور هجوم عدو قوي، وألغِ المضاد لإيقافه أثناء التجمع، وتسليم عندما تصل مسيرات DTF إلى الوسط. زامن حشدهم من الشارة الزرقاء مضاد.', tip_admTdl_t:'قادة دفاع الأبراج', tip_admTdl:'اختر حتى قائدين قويين للتنقل بين الأبراج. يرون الهجمات التالية للتغطية ويحجزونها، واحدًا لكل برج.', tip_admRp_t:'النسب المحفوظة', tip_admRp:'سمِّ نسب القوات واضبطها قبل القتال. يختارها الجميع من قائمة، فتقل الكتابة أثناء المعركة.', tip_admRep_t:'بلاغات المشاكل', tip_admRep:'البلاغات المرسلة أثناء المعركة مع ما كانت تعرضه الشاشة. نسخ الكل والصقه لـ Claude.', tutLater:'سيعود الشرح التعليمي في تحديث قادم.', betaAgree:'باستخدامك MAD OPS توافق على عدم مشاركته مع أي أحد خارج DTF أو ROS.', refHdr:'الروابط المشاركة', refLine:'جلب {k}:', refNone:'لم ينضم أحد من رابط مشارك بعد.', refNoTag:'فُتح دون رابط معرّف: {k}', refUnknown:'رابط غير معروف {c}', shareBtn:'نسخ الرابط لزميل', shareNeedName:'احفظ اسمك في اللعبة أولًا.', shareText:'MAD OPS: مؤقت الحشود لـ DTF/ROS. لا تشاركه خارج DTF أو ROS.', shareDone:'تمت المشاركة. لزملاء DTF أو ROS فقط من فضلك.', shareCopied:'تم نسخ الرابط. أرسله لزميل من DTF أو ROS فقط.', nbBtn:'إعادة ضبط لمعركة جديدة', nbQ:'اكتب RESET لبدء معركة جديدة. يعود الجميع إلى إدخال أزمنة المسير (تبقى الأسماء). تُمسح كل الهجمات والحشود والأهداف المسيطر عليها والأعداء المحفوظين والهجمات المضادة وحجوزات الأبراج.', nbNo:'لم تتم إعادة الضبط: لم تكتب RESET.', nbSent:'أُرسلت إعادة الضبط إلى الجميع.', nbNeedCtl:'فقط المسؤول المتحكم يمكنه إعادة الضبط.', nbDone:'معركة جديدة: أُعيد ضبط كل شيء. أدخل أزمنة المسير.', shareFail:'تعذّر نسخ الرابط. حاول مرة أخرى.', notAdmin:'هذا الحساب ليس في قائمة المسؤولين. اطلب من المالك إضافته في قسم المسؤولين.', notAdminErr:'تم تسجيل الدخول، لكن هذا الحساب ليس في قائمة المسؤولين. اطلب من المالك إضافته.', tooMany:'محاولات كثيرة جدًا. انتظر قليلًا (حتى ساعة) ثم حاول مجددًا.', admHdr:'المسؤولون', admHow:'أنشئ الحساب في Firebase Authentication (بريد وكلمة مرور)، ثم أضف البريد هنا. المالكون (★) يمكنهم تعديل هذه القائمة.', admFixed:'المسؤولون المضمّنون في قواعد الأمان لا يظهرون هنا.', admOwner:'مالك', admOwnerTip:'المالكون يمكنهم إضافة المسؤولين وإزالتهم', admAdd:'إضافة مسؤول', admBad:'أدخل عنوان بريد كاملًا.', admHave:'هذا البريد مسؤول بالفعل.', admRmQ:'إزالة {e} من المسؤولين؟', admSaved:'تم حفظ قائمة المسؤولين.', admFail:'تعذّر الحفظ. المالكون فقط يمكنهم تعديل القائمة (انشر القواعد الجديدة أولًا).', helpBtn:'؟ مساعدة', helpTitle:'مساعدة MAD OPS', helpClose:'إغلاق', helpWhatH:'ما هو MAD OPS؟', helpWhat1:'MAD OPS هو مؤقت المعارك الخاص بـ DTF لمعارك Supreme Prison وSvS. ما زلت تلعب داخل اللعبة، وMAD OPS يخبرك بالضبط متى تبدأ أو تنضم أو ترسل، لتصل مسيرات الجميع معاً.', helpWhat2:'الهدف: لا مزيد من العد التنازلي في الدردشة. المسؤول يدير المعركة من شاشة واحدة، وساعة كل هاتف مضبوطة عليها، وشاشتك تعرض فقط ما عليك فعله بعد ذلك. بهذا تضرب DTF بقوة أكبر وتدافع بشكل أفضل.', helpBetaH:'ما هي النسخة التجريبية المباشرة؟', helpBeta1:'النسخة التجريبية هي نسخة اختبار. هذه معركة حقيقية، لكن بعض ميزات التطبيق تُستخدم في المعركة لأول مرة، لذلك قد لا تعمل بعض الأشياء بشكل مثالي.', helpBeta2:'إذا بدا شيء غير صحيح، تابع اللعب واتبع القادة في الدردشة. عندما تسنح لك الفرصة، اضغط الإبلاغ عن مشكلة (بجانب المغادرة والبدء من جديد) ليتمكن المسؤول من إصلاحه.', helpStartH:'البداية', helpS1:'في أعلى الشاشة، اختر لغتك واضغط زر الصوت حتى يظهر الصوت مفعّل، لتسمع التنبيهات.', helpS2:'أدخل اسمك في اللعبة ووقت مسيرك إلى كل هدف من الأهداف الخمسة بالدقائق:الثواني (مثلاً 0:42)، ثم اضغط حفظ. تعرض اللعبة وقت المسير عندما ترسل قوات إلى هدف.', helpS3:'على الخريطة، اضغط الهدف الذي طُلب منك الذهاب إليه.', helpS4:'اختر دورك. إذا كانت DTF تسيطر على هذا الهدف بالفعل، فسيتم تعيينك للدفاع عنه.', helpBoxH:'راقب المربع الكبير', helpBox:'المربع الكبير في الأعلى يخبرك دائماً بما عليك فعله الآن. استعداد تعني انتظر. عندما يصبح أخضر، تصرّف في اللعبة فوراً.', helpRolesH:'أدوار بسيطة', helpJoin:'منضم (انضمام): اضغط رمز قائد التجمع الذي ستنضم إليه، ثم انتظر. عندما يصبح المربع أخضر ويظهر انضم الآن، انضم إلى ذلك التجمع في اللعبة بنسبة القوات المعروضة.', helpDef:'مدافع: أنت تعزّز هدفاً تسيطر عليه DTF. عندما يصل المؤقت إلى الصفر ويظهر أرسل، أرسل تعزيزاتك في اللعبة. أرسل الآن · سرّع تعني أرسل فوراً وسرّع مسيرك.', helpLead:'قائد التجمع (قائد): للاعبين ذوي الخبرة. نصيحة قصيرة تشرحه أول مرة تختاره.', helpBtnsH:'أزرار مفيدة', helpB1:'عرض النافذة العائمة: نافذة مؤقت صغيرة فوق اللعبة.', helpB2:'إبقاء الشاشة مضاءة: يمنع شاشتك من الانطفاء.', helpB3:'عرض مضغوط: مربع المؤقت فقط، لتقسيم الشاشة بجانب اللعبة.', helpB4:'المغادرة والبدء من جديد: يزيل دورك لتختار من جديد. يبقى اسمك، ويسألك هل تريد الاحتفاظ بأوقات مسيرك.', helpAsk:'ما زلت غير متأكد؟ اسأل في دردشة التحالف. عند الشك، اتبع القادة في اللعبة.', helpTips:'عرض النصائح مرة أخرى', helpTipsOk:'ستظهر النصائح مرة أخرى عند استخدام كل ميزة.', betaHelp:'جديد على MAD OPS؟ اضغط ؟ مساعدة في أعلى الشاشة لدليل سريع.', helpSyncH:'ما الذي يُبقيه متزامناً', helpSync1:'التجمعات: كل قائد تجمع يحصل على وقت بدء خاص به محسوب من مسيره، لتضرب التجمعات القادمة من قواعد مختلفة الهدف معاً.', helpSync2:'المنضمون: يتم إبلاغك لحظة فتح تجمع قائدك، ليمتلئ في الوقت المناسب.', helpSync3:'الدفاع: وقت إرسالك محسوب من وقت مسيرك أنت، لتصل تعزيزاتك مباشرة بعد كل ضربة من العدو.', helpSync4:'التنبيهات: رسائل المسؤول وتنبيهاته الصوتية تصل إلى الجميع في اللحظة نفسها.'
},
ko: {
 chooseFile:'파일 선택', fileTooBig:'파일이 너무 큽니다. 700KB 미만의 클립을 사용하세요.', fileBad:'이 파일을 재생할 수 없습니다. mp3, m4a 또는 wav를 사용하세요.', fileSaving:'저장 중…', builtIn:'내장', clipHint:'음성 버튼마다 짧은 오디오 파일을 선택하세요. 카운트다운 음성은 앱에 내장되어 있습니다.',
 updBtn:'업데이트', noteEnemyName:'먼저 적 이름을 입력하거나 선택하세요.', enemySaved:'{n} {t}(으)로 저장됨', msgHdr:'메시지', msgTo:'받는 사람', audAll:'모두', audLeads:'모든 집결 리더', audJoiners:'모든 참가자', audLead:'리더 {s}', audRally:'{s} 참가자', msgPh:'메시지를 입력하세요', sendBtn:'보내기', msgB1:'집결 시작을 준비하세요', msgB2:'방어를 준비하세요', msgSent:'{a}에게 보냄: {m}', msgEmpty:'먼저 메시지를 입력하세요.', msgClose:'메시지 닫기', editPresets:'버튼 편집', doneEdit:'편집 완료', savePresets:'버튼 저장', presetsSaved:'버튼이 저장되었습니다', textBtns:'텍스트 버튼', voiceBtns:'음성 버튼', cdClips:'카운트다운 음성', labelPh:'라벨', textPh:'메시지', recBtn:'녹음', stopBtn:'정지', playBtn:'재생', delBtn:'삭제', noClip:'녹음 없음', hasClip:'녹음됨', voiceN:'음성 {n}', micErr:'마이크를 사용할 수 없습니다: {m}', clipSaved:'녹음이 저장되었습니다', clipEmpty:'녹음된 내용이 없습니다. 다시 시도하세요.', clipDelQ:'이 녹음을 삭제할까요?', voiceNoClip:'먼저 녹음하세요.', voiceDev:'음성: 기기', voiceRec:'음성: 녹음', voiceNone:'아직 녹음이 없습니다. 기기 음성을 사용합니다.', voiceNeedSound:'녹음을 들으려면 소리를 켜세요.', voiceSent:'{a}에게 음성 보냄: {m}', voiceHint:'음성 버튼은 녹음 음성을 선택한 플레이어에게만 재생됩니다.',
 tutBtn:'튜토리얼', tutNote:'연습용입니다. 팀에는 아무것도 전송되지 않습니다.', tutMenu:'연습을 선택하세요', tutLeadBtn:'집결 리더', tutJoinBtn:'집결 참가자', tutDefBtn:'방어', tutStepN:'{m}단계 중 {n}단계', tutNext:'다음', tutExit:'튜토리얼 종료', tutOpen:'준비 완료: 오버레이 띄우기', tutCont:'계속', tutAgain:'다시 연습', tutToMenu:'메뉴', tutSound:'소리 켜기', tutAdmin:'튜토리얼을 시작하기 전에 관리자에서 로그아웃하세요.', tutTeam:'팀 출발', tutSwitch:'게임으로 이동하세요', tutStartIn:'곧 시작합니다', tutRetLbl:'잘했어요!', tutRetTime:'돌아가기', tutRetSub:'튜토리얼로 돌아오세요', tutRetSay:'잘했습니다. 튜토리얼로 돌아오세요.', sL1:'당신은 집결 리더 VX입니다. 팀원 AB와 KT는 가상으로 진행됩니다. 튜토리얼이 관리자 역할을 합니다.', sL2:'아래 상자에서 리더를 누르세요.', sL3:'기호와 행군 시간이 미리 입력되어 있습니다 (VX, 0:50). 확인하고 확인을 누르세요.', sL4:'대기: 관리자가 아직 리더를 확정하지 않았습니다. 다음을 눌러 확정하게 하세요.', sL5:'대기 중: 리더가 확정되었습니다. 다음을 눌러 준비 확인을 시작하세요.', sL6:'준비 확인! 아래 상자의 초록색 준비 버튼을 누르세요.', sL7:'모두 준비되었습니다. 이제 관리자가 카운트다운을 시작합니다. 버튼을 누르고 게임으로 이동해 떠 있는 창을 보세요.', sRun:'지금 게임으로 이동하세요. 떠 있는 창이 3, 2, 1을 센 뒤 출발 타이머를 보여 주고 출발!이 깜빡입니다. 돌아올 때를 알려 줍니다. 창이 열리지 않으면 아래 상자를 보세요.', sL9:'집결 한 번을 모두 해 보았습니다. AB가 먼저 출발해서 모든 집결이 함께 도착합니다. 휴대폰에서는 오버레이를 띄우기 전에 앱에서 준비를 누르세요.', sJ1:'당신은 집결 참가자입니다. 리더 4명(AB, KT, QZ, VX)은 가상으로 진행됩니다. 튜토리얼이 관리자와 리더 역할을 합니다.', sJ2:'아래 상자에서 참가를 누르세요.', sJ3:'대기: 관리자가 아직 리더를 확정하지 않았습니다. 다음을 눌러 확정하게 하세요.', sJ4:'집결을 선택하세요: 참가할 리더의 기호를 누르세요.', sJ5:'행군 시간을 입력하고 (미리 입력됨 0:41) 확인을 누르세요.', sJ6:'대기 중: 누를 것이 없습니다. 다음을 눌러 준비 확인을 시작하세요.', sJ7:'곧 카운트다운이 시작됩니다. 버튼을 누르고 게임으로 이동해 지켜보세요. 리더가 출발하면 창이 초록색으로 바뀝니다: 집결 시작, 지금 참가!', sJ9:'잘했습니다. 집결 시작이 보이면 게임에서 그 집결에 참가하세요.', sD1:'같은 팀(AB, KT, QZ, VX)이 함께 방어합니다. 관리자가 방어 모드로 전환했습니다.', sD2:'중심까지의 행군 시간 0:36을 입력하고 확인을 누르세요.', sD3:'공격 하나가 옵니다. 모두 보내서 지원군이 타격 0.4초 뒤에 도착하게 합니다. 버튼을 누르고 게임으로 이동해 타이머가 0이 되면 보내세요.', sD6:'이제 공격 세 개가 연달아 옵니다. 작은 숫자는 남은 출발 횟수입니다. 붉은 빛은 두 공격이 1초 이내 간격으로 온다는 뜻이며, 거의 동시에 두 번 보내야 합니다. 각 타이머는 다음 타이머로 자동 교체됩니다.', sD9:'이제 방어할 수 있습니다. 늦게 출발했다면 게임에서 행군을 가속하세요. 마지막 출발 후에는 병력 비율을 확인하세요.',
 ginPh:'게임 내 이름', nameNeeded:'게임 내 이름을 입력하세요', ctlYou:'제어권이 있습니다', ctlView:'보기 전용 · {n}님이 제어 중', ctlNone:'아직 제어권을 가진 사람이 없습니다', adminsHere:'접속 중인 관리자', reqBtn:'제어권 요청', reqSent:'요청을 보냈습니다', reqQueue:'대기 {p}번째', reqCancel:'취소', reqRow:'{n}님이 제어권을 요청함', xferBtn:'넘기기', declBtn:'거절', ctlGained:'이제 제어권이 있습니다', ctlLost:'제어권이 {n}님에게 넘어갔습니다', ctlDeclined:'요청이 거절되었습니다', ctlExpired:'요청이 만료되었습니다', ctlNoReq:'해당 요청이 더 이상 없습니다', viewNote:'제어권이 있는 관리자만 변경할 수 있습니다. 리더 또는 참가 상자는 계속 사용할 수 있습니다.',
 emailPh:'관리자 이메일', badLogin:'이메일 또는 비밀번호가 틀렸습니다', errEmailOff:'Firebase Authentication에서 이메일/비밀번호 로그인을 켜세요.',
 back:'↩', language:'언어', live:'연결됨', offline:'오프라인', connecting:'연결 중…', room:'방', clockPill:'시계 ±{n}ms', clockNone:'시계 --',
 soundOff:'소리 꺼짐', soundOn:'소리 켜짐', popBtn:'오버레이 띄우기', wakeBtn:'화면 켜짐 유지', wakeOn:'화면 켜짐 유지 중', popPreview:'오버레이 미리보기', adminLink:'관리자',
 resetMe:'↺ 나가기 및 처음부터', resetConfirm:'나가고 역할, 기호, 행군 시간을 지울까요?', marchTarget:'목표까지 행군 시간', marchCenter:'중심까지 행군 시간',
 roleLead:'집결 리더 {sym}', roleJoin:'집결 참가자', noRole:'아직 역할 없음', adminSuffix:' · 관리자',
 errRules:'Firestore가 요청을 차단했습니다. 보안 규칙을 확인하세요.', errAuth:'Firebase Authentication에서 익명 로그인을 켜세요.', errGeneric:'오류: {m}',
 noteMarchFirst:'먼저 행군 시간을 입력하세요.', noteConfirmFirst:'먼저 리더를 확정하세요.', noteNoLeaders:'아직 리더가 없습니다.', noteTypeTimer:'게임에 표시된 타이머를 입력하세요.',
 noteLimit:'공격은 최대 6개입니다. 먼저 하나를 지우세요.', noteTaken:'다른 관리자가 활성 상태입니다.', noteTookOver:'다른 관리자가 넘겨받았습니다.',
 noteWakeNo:'여기서는 화면 켜짐 유지를 지원하지 않습니다.', noteWakeRef:'화면 켜짐 유지 거부됨: {m}', notePopRef:'오버레이 거부됨: {m}', notePopTap:'오버레이 거부됨: {m} 다시 누르세요.', notePopNone:'이 브라우저는 오버레이를 지원하지 않습니다.',
 chooseRole:'역할을 선택하세요', lead:'리더', join:'참가', leadEntry:'집결 리더 · 기호 + 행군 시간', symErr:'기호는 2자여야 합니다', marErr:'행군 시간을 입력하세요', symTaken:'이미 사용 중인 기호',
 ok:'확인', editBtn:'↩ 수정', waitingAdmin:'관리자 대기 중', standingBy:'대기 중', wait:'대기', standby:'대기 중', readyCheck:'준비 확인', ready:'준비', readyDone:'준비 ✓',
 waitOthers:'다른 사람 대기 중', notInOp:'이번 작전에 없음', missed:'놓침', waitNext:'다음을 기다리세요', cdLabel:'집결 타이머 시작까지', launchIn:'{sym} 출발까지',
 send:'출발!', rallyRunning:'집결 진행 중', launched:'출발함', doneLbl:'완료', DONE:'완료', waitAdminSub:'관리자를 기다리세요', joinWait:'리더 대기 중', pickRally:'집결을 선택하세요',
 joiningMarch:'{sym} 참가 · 내 행군 시간', joining:'{sym} 참가 중', rallyNot:'집결이 아직 시작되지 않음', rallyStarted:'집결 시작', joinNow:'지금 참가!', readyQ:'준비?',
 marchSub:'행군 {t}', changeBtn:'↩ 변경', cdSub:'집결 시작 중', say_send:'출발', say_join:'집결이 시작되었습니다. 지금 참가하세요.', say_sound:'소리가 켜졌습니다',
 centerMarch:'중심 행군 {t}', defense:'방어', sendIn:'{l} · 출발까지', thenGap:' · 이후 {s}초', allSent:'모두 출발', checkRatios:'병력 비율을 확인하세요', editMarch:'✎ 행군 시간',
 modeChange:'모드 전환', modeDef:'방어', modeAtk:'공격',
 admin:'관리자', logout:'로그아웃', tabAtk:'1 · 집결 공격', tabDef:'2 · 방어', modeConfirm:'{m} 모드로 전환할까요? 모든 플레이어에게 알림이 갑니다. 역할과 행군 시간은 유지됩니다.',
 modeNameAtk:'집결 공격', modeNameDef:'방어', pw:'관리자 비밀번호', login:'로그인', wrongPw:'비밀번호가 틀렸습니다',
 leadersJoiners:'리더 {a} · 참가자 {b}', confirmLeaders:'리더 확정', leadersLocked:'리더 확정됨',
 hitOrder:'타격 순서 · 첫 타격이 맨 위', joinedN:'{n}명 참가', noLeadersMsg:'아직 리더가 없습니다. 링크를 공유하고 리더에게 리더를 선택하라고 하세요.', leadBuffer:'시작 여유',
 readyCheckBtn:'준비 확인', startNow:'지금 시작', reset:'초기화', resetOpConfirm:'작전을 초기화할까요? 리더와 참가자가 다시 입력해야 합니다.',
 offsetsNote:'간격: 집결 사이 0.1초, 마지막은 +0.4초. −와 +로 조정하세요.', startsT:'{t} 시작', tMinus:'T−{t}', launchedLbl:'출발함',
 stStarting:'{n}초 후 시작', stRunning:'집결 작전 진행 중', stReadyWait:'준비 확인: 리더 대기 중', stConfirmed:'리더 확정됨', stCollecting:'리더 모집 중', moveUp:'위로', moveDown:'아래로',
 known:'알려진 적 · 눌러서 채우기', knownNone:'아직 없음. 새 이름은 0:30으로 시작합니다.', newAttack:'새 공격', namePh:'이름', marchWord:'행군', rally5:'집결 5:00', alreadyMarching:'이미 행군 중',
 timerInGame:'게임 타이머', syncBtn:'동기화', resyncBtn:'재동기화', timeline:'타임라인', noAttacks:'들어오는 공격 없음.', landPlus:'도착 +', gapLbl:'간격 {a} → {b} {s}초',
 clearAll:'모두 지우기', clearAllConfirm:'들어오는 공격을 모두 지울까요?', rallyW:'집결', marchW:'행군', landedW:'도착함', removeBtn:'삭제',
 resetDef:'방어 초기화', resetDefConfirm:'방어를 초기화할까요? 모든 공격과 동기화 입력이 지워집니다. 알려진 적은 유지됩니다.', forgetAll:'모두 잊기', forgetAllConfirm:'알려진 적을 모두 잊을까요?', forgetOne:'{n} 잊기',
 profHdr:'내 프로필', namePh2:'게임 내 이름', nameReq:'게임 내 이름을 입력하세요.', marHdr:'목표별 행군 시간', marReq:'다섯 개의 행군 시간을 모두 입력하세요.', tC:'중앙', tN:'북쪽', tS:'남쪽', tE:'동쪽', tW:'서쪽', saveProf:'저장', editProf:'프로필 수정', profSaved:'프로필 저장됨', pickTarget:'지도에서 목표를 고르세요', mapHdr:'목표', defBadge:'방어', chooseAct:'{t} · 역할 선택', defendAnyway:'그래도 방어', leave:'↺ 이 목표 떠나기', meLine:'{n} · {t} · {r}', meNone:'{n} · 목표 없음', roleLeadSym:'리더 {s}', roleJoinOf:'{s} 참가 중', roleDef:'방어 중', joinedList:'참가: {n}', nobodyJoined:'아직 참가자 없음', symEntry:'{t} · 2글자 기호', groupBtn:'그룹 집결', soloBtn:'단독 집결', chooseMode:'{t} · {s} · 그룹 또는 단독?', unregister:'등록 해제', grpNotCalled:'관리자가 그룹을 부를 때까지 대기', grpReset:'그룹이 초기화되었습니다', rejoin:'그룹 재참가', soloRatio:'{t} · {s} · 병력 비율', startBtn:'시작', ratioErr:'합이 100인 병력 비율을 입력하세요.', ratioPh:'방패병/폭격병/사수', troops:'병력 {r}', gathering:'{t} · {s} 집결 중', gatheringEst:'{t} · {s} 집결 중 (추정)', syncGather:'동기화', gatherPh:'타이머', syncedOk:'동기화됨', estTag:'추정', prepReinforce:'지원 준비', verifying:'성공 확인 중', winBtn:'공격 성공', failBtn:'공격 실패', say_reinforce:'지원 준비', say_verify:'성공 확인 중', say_disband:'집결 해산', say_defense:'방어로 전환', pickLead:'{t} · 집결 선택', noLeadsHere:'{t}에 아직 집결 리더가 없습니다', joiningSym:'{t} · {s} 참가 중', disbanded:'집결 해산', pickAgain:'다른 집결을 고르세요', defending:'{t} · 방어 중', noIncoming:'아직 들어오는 공격 없음', nowDef:'{t}이(가) 이제 방어 중입니다. 방어하지 않는다면 다른 역할을 고르세요.', youDef:'이제 {t}을(를) 방어합니다.', mgTarget:'목표 관리', myTargetBtn:'내 목표', subAtk:'공격', subDef:'방어', grpHdr:'그룹 집결', callGroup:'그룹 부르기', endGroup:'그룹 종료', endGroupQ:'{t}의 그룹을 종료할까요? 리더들이 다시 그룹/단독을 고릅니다.', setRatio:'적용', ralliesHdr:'{t}의 집결', noRallies:'진행 중인 집결 없음.', soloTag:'단독', groupTag:'그룹', ratioOv:'비율', phGather:'집결 {x}', phGatherEst:'집결 {x} (추정)', phMarch:'행군 {x}', phVerify:'확인 중', winQ:'{t} 공격을 성공으로 표시할까요? 참가자 모두 방어로 전환합니다.', failQ:'{t} 공격을 실패로 표시할까요?', heldOn:'점령: 예', heldOff:'점령: 아니요', defCount:'{n}명 방어 중', audTgt:'{t}의 모두', audOne:'{n}', audPlayers:'플레이어', audFilter:'이름 검색', dupMark:'⚠ 중복', audLeadsGrp:'리더', audRallies:'집결 참가자', audGeneral:'전체', marNotOk:'⚠ 행군 미확인 · 게임을 확인하세요', marNotOkAdm:'⚠ 행군 미확인', helpReqBtn:'도움 요청', helpCancel:'도움 취소', helpWaiting:'도움 요청됨…', helpByLbl:'{n}이(가) 돕는 중', helpCallBtn:'도움: {s} {n} · {t}', helpingBar:'{t}의 {s} 돕는 중', helpDone:'도움 완료', helpTaken:'다른 관리자가 이미 돕고 있습니다.', helpNote:'{n}이(가) 도와주고 있습니다', helpRallyWait:'집결 아직 시작 안 됨', helpCount:'내 도움 요청: {n}', msgB3:'도움 요청 최다', suckOne:'{n} 최악!', suckTie:'{n} 최악!', andWord:', ', noHelpYet:'아직 도움을 요청한 사람이 없습니다.', ctlOtherDev:'다른 기기에 조작 권한이 있습니다', takeHere:'이 기기에서 조작하기', wakeOk:'이 페이지가 열려 있는 동안 화면이 켜져 있습니다. 끄려면 다시 누르세요.', changeMode:'↩ 그룹/단독', grpAvail:'대기 가능', grpAvailSub:'관리자가 그룹에 선택할 수 있습니다', grpPicked:'그룹에 선택됨', soloQ:'단독 집결?', soloQSub:'직접 이끌고 그룹 목록에서 빠집니다.', soloYes:'예, 단독 집결', soloNo:'취소', backGroup:'↩ 그룹 목록', pickHint:'그룹에 넣을 리더를 누르세요:', pickLocked:'그룹 진행 중. 리더를 바꾸려면 초기화하세요.', noAvail:'이 목표에 아직 리더가 없습니다.', startGrp:'그룹 집결 시작', noteSelFirst:'먼저 리더를 한 명 이상 고르세요.', youDefNote:'이제 {t}을(를) 방어합니다. 게임에서 방어하지 않나요? 공격으로 돌아가기를 누르세요.', notDefQ:'게임에서 방어하지 않나요? 공격으로 돌아가기를 누르세요', backAtk:'↩ 공격으로 돌아가기', pickAtk:'공격할 목표를 고르세요.', compactBtn:'간단히 보기', fullBtn:'전체 보기', errConn:'연결 오류입니다. 페이지를 새로고침하세요.', resetConfirm2:'현재 역할과 기호를 떠날까요? 이름은 유지됩니다.', keepMarQ:'행군 시간을 유지할까요? 새 전투에서는 보통 기지가 옮겨집니다.', keepMar:'행군 시간 유지', newMar:'새 행군 시간 입력', marKept:'행군 시간을 유지했습니다.', newBattleQ:'새 전투인가요? (마지막으로 연 지 24시간 이상)', newBattleYes:'예, 새 전투', newBattleNo:'아니요, 같은 전투', vVol:'볼륨', rpLbl:'비율 프리셋', rpCustom:'직접 입력', rpSetBtn:'적용', myRatio:'내 비율', rpHdr:'비율 프리셋', rpName:'프리셋 이름', rpAdd:'+ 프리셋 추가', rpSave:'프리셋 저장', rpSaved:'비율 프리셋 저장됨.', rpErr:'프리셋마다 다른 이름과 합이 100인 세 숫자가 필요합니다 (최대 10개).', defRatio:'방어 비율', ovClr:'그룹 비율 사용', rpSet:'비율: {r}', say_ready:'준비 확인', sameRatio:'모든 집결에 같은 비율', leadOwn:'(리더 선택)', youTag:'나', lateHdr:'지금 보내기 · 가속', lateSub:'내 행군 {m} · {l} 후 도착 · {s} 가속 필요', say_late:'지금 보내고 가속하세요', cancelRally:'집결 취소', cancelQ:'이 집결을 취소할까요? 참가자에게 알립니다.', rallyCancelled:'집결 취소됨', cancelledSub:'리더가 다시 시작할 때까지 대기', say_cancelled:'집결 취소됨', verLbl:'버전 {v}', verNew:'앱의 새 버전이 나왔습니다.', verRefresh:'지금 새로고침', repBtn:'문제 신고', repQ:'무엇이 잘못됐나요? (선택) 앱이 화면에 보이던 내용도 저장합니다.', repSent:'신고를 보냈습니다. 감사합니다.', repFail:'신고를 보내지 못했습니다. 페이지를 새로고침하세요.', repHdr:'문제 신고', repNone:'아직 신고 없음.', repCopy:'복사', repCopyAll:'모두 복사', repClear:'모두 삭제', repClearQ:'모든 신고를 삭제할까요?', repCopied:'복사됨. Claude에게 붙여넣으세요.', repCopyManual:'이 텍스트를 복사하세요:', ctrRole:'반격', ctrPickSub:'DTF가 중앙을 점령 중: 방어하거나, 동맹 연맹에서 반격하세요.', defendBtn:'방어', ctrHdr:'반격', ctrSwQ:'연맹을 바꿨나요?', ctrSwSub:'게임에서 동맹 연맹으로 옮겼는지 확인하세요.', ctrSwYes:'예, 옮겼습니다', ctrBmQ:'기지가 옮겨졌나요?', ctrBmSub:'연맹을 바꾼 뒤 기지가 옮겨졌나요?', ctrBmNo:'아니요, 같은 기지', ctrBmYes:'예, 옮겨졌습니다', ctrMarQ:'중앙까지 행군', ctrMarSub:'새 기지에서 중앙까지의 행군 시간을 입력하세요 (분:초).', ctrMarErr:'0:42처럼 행군 시간을 입력하세요.', ctrWaitSub:'중앙까지 행군 {m} · 관리자가 시작 시점을 알려 줍니다', ctrGoT:'지금 시작', ctrGoSub:'{s} 전 알림', ctrGoTap:'지금 중앙에 반격 집결을 시작하고 아래를 누르세요', ctrStarted:'집결을 시작했습니다', say_ctrGo:'지금 반격 집결을 시작하세요', ctrAbortT:'중단', ctrAbortSub:'지금 게임에서 반격 집결을 해산하세요', say_ctrAbort:'중단, 반격 집결을 해산하세요', ctrHoldT:'중앙 사수', ctrHoldSub:'DTF 행군이 도착할 때까지 중앙에서 방어하고, 그다음 모든 방어병을 추방해 중앙을 돌려주세요.', ctrHandT:'지금 추방', ctrHandSub:'DTF 행군이 도착했습니다: 모든 방어병을 추방해 중앙을 돌려주세요.', say_ctrHand:'중앙을 돌려주세요, 지금 방어병을 추방하세요', ctrDone:'완료 · DTF로 복귀', ctrBack:'DTF로 복귀', ctrNewMar:'기지가 옮겨졌습니다: 새 행군 시간을 입력하세요.', ctrAdmHdr:'반격 ({n})', ctrNone:'아직 반격자가 없습니다.', ctrRallying:'집결 중', ctrGoBtn:'반격 시작', ctrAbBtn:'반격 중단', ctrHandBtn:'중앙 반환', ctrAbQ:'반격자들에게 집결 해산을 알릴까요?', ctrSent:'반격자에게 알렸습니다.', ctrStGo:'{s} 전 알림 보냄', ctrStAbort:'{s} 전 중단 보냄', ctrStHand:'{s} 전 반환 보냄', ctrTag:'반격', ctrLand:'도착 {s}', ctrEarly:'너무 이름', ctrTight:'빠듯함', ctrGood:'좋음', ctrLate:'늦음', ctrOnlyThem:'이 행군은 반격자만 수정합니다.', tdlHdr:'타워 방어 리더', tdlPick:'공격 선택', tdlPickSub:'초록색 공격을 눌러 맡고 그곳으로 서둘러 가세요', tdlBeIn:'이때까지 도착 · {l} 후 도착', tdlLands:'도착까지 · 방어 리더를 맡으세요', tdlDrop:'맡기 취소', tdlTaken:'다른 리더가 그 공격을 맡았습니다.', tdlGone:'{t}의 공격이 삭제되었습니다: 맡기 종료.', say_tdlIn:'지금 도착하세요', say_tdl:'당신은 타워 방어 리더입니다', tdlYou:'관리자가 당신을 타워 방어 리더로 지정했습니다.', tdlOff:'더 이상 타워 방어 리더가 아닙니다.', tdlAdmHdr:'타워 방어 리더 ({n}/{m})', tdlNoLeads:'선택할 집결 리더가 없습니다.', roleTdl:'타워 방어 리더', skBtn:'스킨', skHdr:'스킨', skUpload:'스킨 파일 올리기', skEdit:'직접 만들기', skEditClose:'편집기 닫기', skAi:'AI 프롬프트', skDownload:'스킨 파일 받기', skDefault:'기본 스킨', skNow:'현재: {n}', skOffNow:'이번 방문은 스킨 꺼짐 (skin=off)', skRadius:'모서리', skSt_flat:'평면', skSt_gradient:'그라데이션', skSt_bevel:'금속', skSt_glow:'빛', skSt_storm:'폭풍', skF_system:'기본 글꼴', skF_rounded:'둥근 글꼴', skF_serif:'명조 글꼴', skF_mono:'타자기 글꼴', skF_condensed:'좁은 글꼴', skWall:'배경 사진', skNoWall:'배경 없음', skDim:'어둡게', skName:'스킨 이름', skSave:'스킨 저장', skSaved:'이 기기에 스킨을 저장했습니다.', skLoaded:'스킨 “{n}”을(를) 불러왔습니다.', skDefOk:'기본 스킨(MAD OPS)으로 돌아왔습니다.', sk_bg:'페이지', sk_pan:'패널', sk_bd:'테두리', sk_tx:'글자', sk_mu:'작은 글자', sk_am:'강조색', skTx:'글자', skPan:'패널', skBg:'페이지', skMu:'작은 글자', skAm:'강조색', skErrFile:'MAD OPS 스킨 파일이 아닙니다.', skErrColor:'색상 “{k}”은(는) #12ab34 형식이어야 합니다.', skErrWall:'배경은 사진이어야 합니다.', skErrCon:'읽기 어렵습니다: {b} 위의 {a}. 더 대비되는 색을 고르세요.', skErrAm:'강조색이 버튼 글자에 비해 너무 어둡습니다. 더 밝은 색을 고르세요.', skErrSpace:'이 기기에 스킨을 저장할 공간이 부족합니다.', skAiHow:'이것을 복사해 [대괄호] 부분을 내 아이디어로 바꾼 뒤 아무 AI 채팅에 붙여넣으세요. 답변을 .json 파일로 저장해 여기에 올리세요.', betaTitle:'라이브 베타', betaSub:'버전 {v} · 이번 전투는 새 기능의 실전 테스트입니다. 문제가 생길 수 있어요: 계속 플레이하며 문제를 찾아 주세요.', betaNewHdr:'새로 써 볼 기능', betaN1:'반격 집결: DTF가 중앙을 점령하면 중앙 → 반격을 누르세요.', betaN2:'타워 방어 리더: 관리자가 가장 강한 리더를 골라 타워 사이를 뛰게 합니다.', betaN3:'비율 프리셋: 모든 비율에 이름이 표시됩니다 (공격 1, 방어 2, 직접 입력).', betaN4:'공격이 너무 가까워 보통 보내기로는 늦을 때 지금 보내기 · 가속.', betaN5:'스킨: 스킨을 눌러 모양을 바꾸세요. 아래쪽 기본 스킨으로 되돌립니다.', betaRepHdr:'문제가 생기면', betaR1:'가능한 빨리 문제 신고(나가기 및 처음부터 아래)를 누르세요. 앱이 화면 내용을 저장합니다.', betaR2:'몇 마디 적어 주세요: 무엇을 하던 중이었고 무엇을 기대했는지. 예: “VX 참가, 지금 참가! 안 뜸”.', betaR3:'계속 플레이하세요. 타이머가 이상하면 채팅의 리더를 따르세요.', betaR4:'전투 후 기억나는 것을 관리자에게 알려 주세요. 관리자가 모든 신고를 모읍니다.', betaFoot:'MAD OPS 테스트에 도움을 주셔서 감사합니다.', betaOk:'동의합니다', betaLink:'베타 정보', tipNoMore:'다시 보지 않기', tip_lead_t:'집결 리더', tip_lead:'이 목표의 공격 집결을 이끕니다. 바로 그룹 집결에 대기 상태가 됩니다: 관리자가 리더를 고르고 준비 확인을 시작합니다. 직접 시작하려면 단독 집결을 고르세요. 내 비율에서 내 집결만의 병력 비율을 정할 수 있습니다.', tip_solo_t:'단독 집결', tip_solo:'이 집결을 직접 시작합니다. 비율을 고르고 게임에서 집결을 시작할 때 시작을 누른 뒤, 게임의 집결 타이머를 입력해 동기화하세요. 참가자가 내 타이머를 따릅니다. 집결 취소는 멈추고 알립니다.', tip_join_t:'집결 참가', tip_join:'한 명의 집결 리더를 따릅니다. 지도 색: 초록 = 아직 행군 전, 노랑 깜빡임 = 20초 안에 행군, 빨강 깜빡임 = 5초 안, 빨강 = 행군 중. 리더가 시작하면 비율과 함께 지금 참가!가 뜹니다: 게임에서 참가하세요.', tip_def_t:'방어', tip_def:'관리자가 들어오는 공격을 동기화하면 내 행군 기준의 보내기 타이머가 생겨 지원이 공격 직후 도착합니다. 공격이 너무 가까우면 필요한 가속량과 함께 지금 보내기 · 가속이 뜹니다.', tip_ctr_t:'반격', tip_ctr:'동맹 연맹에서 중앙을 공격해, 강한 적 공격 직후 약해진 적 방어병 위에 도착합니다. 시작 시점은 관리자가 알려 줍니다. 성공하면 DTF 행군이 도착할 때까지 중앙을 지키고 돌려줍니다.', tip_tdl_t:'타워 방어 리더', tip_tdl:'타워 사이를 뛰어다니며 공격이 도착하기 전에 방어 리더를 맡습니다. 초록 공격이 다음으로 막을 공격입니다. 하나를 맡으면 다른 리더는 못 맡습니다. 이때까지 도착은 도착 10초 전입니다.', tip_ratio_t:'비율 프리셋', tip_ratio:'관리자가 전투 전에 정한 이름 있는 비율을 고르거나, 직접 입력으로 내 비율을 적으세요. 집결 전원이 이름과 숫자를 봅니다. 숫자를 누르면 직접 입력으로 바뀝니다.', tip_skin_t:'스킨', tip_skin:'이 기기에서 앱 모양을 바꿉니다: 기본 제공 스킨을 고르거나, 직접 만들거나, 친구가 보낸 파일을 불러오세요. 집결과 경고 색은 바뀌지 않습니다. 페이지 아래 기본 스킨이 언제나 원래 모양으로 되돌립니다.', tip_compact_t:'간단히 보기', tip_compact:'큰 버튼과 함께 타이머 상자만 보여 줍니다. 게임 옆 플로팅 창이나 화면 분할용입니다. 전체 보기로 페이지를 되돌립니다.', tip_pop_t:'오버레이', tip_pop:'타이머 상자를 게임 위에 떠 있는 작은 창에 넣습니다. PC에서는 버튼이 작동하고, 휴대폰에서는 상자의 이미지입니다.', tip_report_t:'문제 신고', tip_report:'화면 내용과 앱 상태를 메모와 함께 관리자에게 저장합니다. 이상해 보이면 바로 쓰고 계속 플레이하세요.', tip_help_t:'도움 요청', tip_help:'내 집결에 대해 관리자에게 도움을 요청합니다. 먼저 응답한 관리자가 타이머를 대신 동기화하고 조정할 수 있습니다.', tip_admAtk_t:'그룹 집결', tip_admAtk:'단독이 아닌 모든 리더가 표시됩니다. 원하는 리더를 누르고 순서와 비율을 정한 뒤 그룹 집결 시작. 리더가 준비를 누르면 카운트다운이 자동으로 시작됩니다.', tip_admDef_t:'들어오는 공격', tip_admDef:'게임 타이머로 적 공격을 하나씩 동기화하세요. 이 목표의 방어자는 각자 행군 기준의 보내기 타이머를 받습니다. 새 적의 행군은 실시간으로 조정하기 전까지 30초 추정입니다. 방어 비율도 여기서 정합니다.', tip_admCtr_t:'반격', tip_admCtr:'반격자가 여기 표시됩니다. 강한 적 공격이 보이면 반격 시작, 집결 중 취소하려면 반격 중단, DTF 행군이 중앙에 도착하면 중앙 반환을 누르세요. 파란 반격 칩으로 집결을 동기화합니다.', tip_admTdl_t:'타워 방어 리더', tip_admTdl:'타워 사이를 뛸 강한 집결 리더를 최대 2명 고르세요. 다음에 막을 공격을 보고 타워당 하나씩 맡습니다.', tip_admRp_t:'비율 프리셋', tip_admRp:'전투 전에 병력 비율의 이름과 값을 정하세요. 모두 목록에서 고르므로 전투 중 입력이 줄어듭니다.', tip_admRep_t:'문제 신고', tip_admRep:'전투 중 보낸 신고와 당시 화면 내용입니다. 모두 복사해 Claude에게 붙여넣으세요.', tutLater:'튜토리얼은 다음 업데이트에서 돌아옵니다.', betaAgree:'MAD OPS를 사용하면 DTF 또는 ROS 밖의 누구와도 공유하지 않는 데 동의하는 것입니다.', refHdr:'공유된 링크', refLine:'{k}명 초대:', refNone:'아직 공유 링크로 들어온 사람이 없습니다.', refNoTag:'링크 표시 없이 열림: {k}', refUnknown:'알 수 없는 링크 {c}', shareBtn:'팀원용 링크 복사', shareNeedName:'먼저 게임 내 이름을 저장하세요.', shareText:'MAD OPS: DTF/ROS 집결 타이머. DTF 또는 ROS 밖으로 공유하지 마세요.', shareDone:'공유했습니다. DTF 또는 ROS 팀원에게만 보내 주세요.', shareCopied:'링크를 복사했습니다. DTF 또는 ROS 팀원에게만 보내세요.', nbBtn:'새 전투 초기화', nbQ:'새 전투를 시작하려면 RESET을 입력하세요. 모두 행군 시간을 다시 입력합니다(이름은 유지). 공격, 집결, 점령 목표, 저장된 적, 반격, 타워 맡기가 모두 지워집니다.', nbNo:'초기화하지 않음: RESET을 입력하지 않았습니다.', nbSent:'모두에게 초기화를 보냈습니다.', nbNeedCtl:'조작 권한이 있는 관리자만 초기화할 수 있습니다.', nbDone:'새 전투: 모두 초기화되었습니다. 행군 시간을 입력하세요.', shareFail:'링크를 복사하지 못했습니다. 다시 시도하세요.', notAdmin:'이 계정은 관리자 목록에 없습니다. 소유자에게 관리자 섹션에서 추가해 달라고 하세요.', notAdminErr:'로그인했지만 이 계정은 관리자 목록에 없습니다. 소유자에게 추가해 달라고 하세요.', tooMany:'시도가 너무 많습니다. 잠시(최대 1시간) 기다린 뒤 다시 시도하세요.', admHdr:'관리자', admHow:'Firebase Authentication에서 계정(이메일과 비밀번호)을 만든 뒤 여기에 이메일을 추가하세요. 소유자(★)가 이 목록을 바꿀 수 있습니다.', admFixed:'보안 규칙에 들어 있는 관리자는 여기에 표시되지 않습니다.', admOwner:'소유자', admOwnerTip:'소유자는 관리자를 추가하고 삭제할 수 있습니다', admAdd:'관리자 추가', admBad:'전체 이메일 주소를 입력하세요.', admHave:'이미 관리자인 이메일입니다.', admRmQ:'{e}을(를) 관리자에서 삭제할까요?', admSaved:'관리자 목록을 저장했습니다.', admFail:'저장하지 못했습니다. 소유자만 목록을 바꿀 수 있습니다(먼저 새 규칙을 게시하세요).', helpBtn:'? 도움말', helpTitle:'MAD OPS 도움말', helpClose:'닫기', helpWhatH:'MAD OPS란?', helpWhat1:'MAD OPS는 Supreme Prison과 SvS 전투를 위한 DTF의 전투 타이머입니다. 플레이는 게임에서 그대로 하고, MAD OPS가 언제 시작하고 참가하고 보낼지 정확히 알려 주어 모두의 행군이 함께 도착하게 합니다.', helpWhat2:'목표: 더 이상 채팅으로 카운트다운하지 않습니다. 관리자가 한 화면에서 전투를 진행하고, 모든 휴대폰의 시계가 그 화면에 맞춰지며, 내 화면에는 다음에 할 일만 표시됩니다. 그래서 DTF가 더 강하게 공격하고 더 잘 방어합니다.', helpBetaH:'라이브 베타란?', helpBeta1:'베타는 테스트 버전입니다. 이번 전투는 실제 전투지만, 앱의 일부 기능은 전투에서 처음 사용되므로 몇 가지는 완벽하게 작동하지 않을 수 있습니다.', helpBeta2:'뭔가 이상해 보이면 게임을 계속하면서 채팅의 리더를 따르세요. 여유가 생기면 문제 신고(나가기 및 처음부터 옆)를 눌러 관리자가 고칠 수 있게 해 주세요.', helpStartH:'시작하기', helpS1:'화면 맨 위에서 언어를 고르고, 알림을 들을 수 있도록 소리 버튼을 눌러 소리 켜짐으로 바꾸세요.', helpS2:'게임 내 이름과 다섯 목표 각각까지의 행군 시간을 분:초(예: 0:42)로 입력하고 저장을 누르세요. 목표로 병력을 보낼 때 게임에 행군 시간이 표시됩니다.', helpS3:'지도에서 가라고 안내받은 목표를 누르세요.', helpS4:'역할을 고르세요. DTF가 이미 그 목표를 점령하고 있으면 방어로 지정됩니다.', helpBoxH:'큰 상자를 보세요', helpBox:'맨 위의 큰 상자가 지금 할 일을 항상 알려 줍니다. 대기 중은 기다리라는 뜻입니다. 초록색으로 바뀌면 바로 게임에서 행동하세요.', helpRolesH:'간단한 역할', helpJoin:'참가자(참가): 참가할 집결 리더의 기호를 누르고 기다리세요. 상자가 초록색으로 바뀌고 지금 참가!가 뜨면, 표시된 병력 비율로 게임에서 그 집결에 참가하세요.', helpDef:'방어자: DTF가 점령한 목표를 지원합니다. 타이머가 0이 되고 상자에 출발!이 뜨면 게임에서 지원군을 보내세요. 지금 보내기 · 가속은 즉시 보내고 행군을 가속하라는 뜻입니다.', helpLead:'집결 리더(리더): 경험 많은 플레이어용입니다. 처음 선택하면 짧은 팁이 설명해 줍니다.', helpBtnsH:'유용한 버튼', helpB1:'오버레이 띄우기: 게임 위에 뜨는 작은 타이머 창입니다.', helpB2:'화면 켜짐 유지: 화면이 꺼지지 않게 합니다.', helpB3:'간단히 보기: 타이머 상자만 보여 주어 게임 옆 분할 화면에 좋습니다.', helpB4:'나가기 및 처음부터: 역할을 해제해서 다시 고를 수 있습니다. 이름은 유지되고, 행군 시간을 유지할지 물어봅니다.', helpAsk:'아직 잘 모르겠나요? 동맹 채팅에서 물어보세요. 헷갈릴 때는 게임의 리더를 따르세요.', helpTips:'기능 팁 다시 보기', helpTipsOk:'각 기능을 사용할 때 팁이 다시 표시됩니다.', betaHelp:'MAD OPS가 처음인가요? 화면 맨 위의 ? 도움말을 누르면 간단한 안내가 나옵니다.', helpSyncH:'맞춰 주는 것들', helpSync1:'집결: 집결 리더마다 자기 행군에 맞춘 시작 시간을 받아서, 서로 다른 기지에서 출발한 집결이 함께 목표를 칩니다.', helpSync2:'참가자: 리더의 집결이 열리는 순간 알려 주어 제때 집결이 채워집니다.', helpSync3:'방어: 내 행군 시간으로 출발 시간을 계산해서, 지원군이 적의 공격 직후에 도착합니다.', helpSync4:'알림: 관리자의 메시지와 음성 알림이 모두에게 같은 순간에 전달됩니다.'
},
ja: {
 chooseFile:'ファイルを選択', fileTooBig:'ファイルが大きすぎます。700KB未満のクリップを使ってください。', fileBad:'このファイルは再生できません。mp3、m4a、wavを使ってください。', fileSaving:'保存中…', builtIn:'内蔵', clipHint:'ボイスボタンごとに短い音声ファイルを選んでください。カウントダウン音声はアプリに内蔵されています。',
 updBtn:'更新', noteEnemyName:'先に敵の名前を入力するか選んでください。', enemySaved:'{n} を {t} で保存しました', msgHdr:'メッセージ', msgTo:'宛先', audAll:'全員', audLeads:'全集結リーダー', audJoiners:'全参加者', audLead:'リーダー {s}', audRally:'{s} の参加者', msgPh:'メッセージを入力', sendBtn:'送信', msgB1:'集結開始の準備をしてください', msgB2:'防衛の準備をしてください', msgSent:'{a} に送信: {m}', msgEmpty:'先にメッセージを入力してください。', msgClose:'メッセージを閉じる', editPresets:'ボタンを編集', doneEdit:'編集を終了', savePresets:'ボタンを保存', presetsSaved:'ボタンを保存しました', textBtns:'テキストボタン', voiceBtns:'ボイスボタン', cdClips:'カウントダウン音声', labelPh:'ラベル', textPh:'メッセージ', recBtn:'録音', stopBtn:'停止', playBtn:'再生', delBtn:'削除', noClip:'録音なし', hasClip:'録音済み', voiceN:'ボイス {n}', micErr:'マイクを使用できません: {m}', clipSaved:'録音を保存しました', clipEmpty:'何も録音されませんでした。もう一度お試しください。', clipDelQ:'この録音を削除しますか？', voiceNoClip:'先に録音してください。', voiceDev:'音声: 端末', voiceRec:'音声: 録音', voiceNone:'まだ録音がありません。端末の音声を使います。', voiceNeedSound:'録音を聞くにはサウンドをオンにしてください。', voiceSent:'{a} にボイスを送信: {m}', voiceHint:'ボイスボタンは、録音音声を選んだプレイヤーにだけ再生されます。',
 tutBtn:'チュートリアル', tutNote:'練習用です。チームには何も送信されません。', tutMenu:'練習を選んでください', tutLeadBtn:'集結リーダー', tutJoinBtn:'集結参加者', tutDefBtn:'防衛', tutStepN:'ステップ {n}/{m}', tutNext:'次へ', tutExit:'チュートリアルを終了', tutOpen:'準備OK: オーバーレイを表示', tutCont:'続ける', tutAgain:'もう一度練習', tutToMenu:'メニュー', tutSound:'サウンドをオン', tutAdmin:'チュートリアルを始める前に管理者からログアウトしてください。', tutTeam:'チームの出発', tutSwitch:'ゲームに切り替えて', tutStartIn:'まもなく開始', tutRetLbl:'よくできました！', tutRetTime:'戻る', tutRetSub:'チュートリアルに戻ってください', tutRetSay:'よくできました。チュートリアルに戻ってください。', sL1:'あなたは集結リーダーVXです。仲間のABとKTは自動で動きます。チュートリアルが管理者役を務めます。', sL2:'下のボックスで「リーダー」をタップしてください。', sL3:'記号と行軍時間は入力済みです (VX, 0:50)。確認してOKをタップしてください。', sL4:'待機: 管理者がまだリーダーを確定していません。「次へ」をタップして確定させましょう。', sL5:'待機中: リーダーが確定しました。「次へ」をタップして準備確認を始めます。', sL6:'準備確認です！下のボックスの緑の「準備OK」ボタンをタップしてください。', sL7:'全員の準備ができました。次に管理者がカウントダウンを始めます。ボタンをタップし、ゲームに切り替えて浮かぶウィンドウを見てください。', sRun:'今すぐゲームに切り替えてください。浮かぶウィンドウが3、2、1と数え、出発タイマーを表示して「出発！」と点滅します。戻るタイミングも知らせます。開かない場合は下のボックスを見てください。', sL9:'集結を一通り体験しました。ABが先に出発したので、すべての集結が同時に着弾します。スマホではオーバーレイを開く前にアプリで「準備OK」をタップしてください。', sJ1:'あなたは集結参加者です。リーダー4人 (AB, KT, QZ, VX) は自動で動きます。チュートリアルが管理者とリーダー役を務めます。', sJ2:'下のボックスで「参加」をタップしてください。', sJ3:'待機: 管理者がまだリーダーを確定していません。「次へ」をタップして確定させましょう。', sJ4:'集結を選びます。参加するリーダーの記号をタップしてください。', sJ5:'行軍時間を入力し (入力済み 0:41)、OKをタップしてください。', sJ6:'待機中: タップするものはありません。「次へ」をタップして準備確認を始めます。', sJ7:'まもなくカウントダウンが始まります。ボタンをタップし、ゲームに切り替えて見ていてください。リーダーが出発するとウィンドウが緑になります: 集結開始、今すぐ参加！', sJ9:'よくできました。「集結開始」が表示されたら、ゲームでその集結に参加してください。', sD1:'同じチーム (AB, KT, QZ, VX) が一緒に防衛します。管理者が防衛モードに切り替えました。', sD2:'中心までの行軍時間 0:36 を入力し、OKをタップしてください。', sD3:'攻撃が1件来ます。全員が出発し、援軍が着弾の0.4秒後に到着するようにします。ボタンをタップし、ゲームに切り替えて、タイマーが0になったら出発してください。', sD6:'今度は3件の攻撃が立て続けに来ます。小さな数字は残りの出発回数です。赤い光は、2件の攻撃が1秒以内の間隔で着弾するという意味で、ほぼ同時に2回出発させます。タイマーは自動で次のものに切り替わります。', sD9:'これで防衛できます。出発が遅れたら、ゲーム内で行軍を加速してください。最後の出発後は兵力の比率を確認しましょう。',
 ginPh:'ゲーム内の名前', nameNeeded:'ゲーム内の名前を入力してください', ctlYou:'操作権があります', ctlView:'閲覧のみ · {n}さんが操作中', ctlNone:'まだ操作権を持つ人がいません', adminsHere:'参加中の管理者', reqBtn:'操作権をリクエスト', reqSent:'リクエストを送信しました', reqQueue:'順番 {p}番目', reqCancel:'キャンセル', reqRow:'{n}さんが操作権を求めています', xferBtn:'譲渡', declBtn:'拒否', ctlGained:'操作権を取得しました', ctlLost:'操作権が{n}さんに移りました', ctlDeclined:'リクエストは拒否されました', ctlExpired:'リクエストの期限が切れました', ctlNoReq:'そのリクエストはもうありません', viewNote:'操作権を持つ管理者だけが変更できます。リーダーまたは参加のボックスは引き続き使えます。',
 emailPh:'管理者メール', badLogin:'メールまたはパスワードが違います', errEmailOff:'Firebase Authenticationでメール/パスワードログインを有効にしてください。',
 back:'↩', language:'言語', live:'接続中', offline:'オフライン', connecting:'接続しています…', room:'ルーム', clockPill:'時計 ±{n}ms', clockNone:'時計 --',
 soundOff:'サウンドオフ', soundOn:'サウンドオン', popBtn:'オーバーレイを表示', wakeBtn:'画面をつけたままにする', wakeOn:'画面を点灯中', popPreview:'オーバーレイのプレビュー', adminLink:'管理者',
 resetMe:'↺ 退出してやり直す', resetConfirm:'退出して役割・記号・行軍時間を消去しますか？', marchTarget:'目標までの行軍時間', marchCenter:'中心までの行軍時間',
 roleLead:'集結リーダー {sym}', roleJoin:'集結参加者', noRole:'役割は未設定', adminSuffix:' · 管理者',
 errRules:'Firestoreがリクエストをブロックしました。セキュリティルールを確認してください。', errAuth:'Firebase Authenticationで匿名ログインを有効にしてください。', errGeneric:'エラー: {m}',
 noteMarchFirst:'先に行軍時間を入力してください。', noteConfirmFirst:'先にリーダーを確定してください。', noteNoLeaders:'リーダーがまだいません。', noteTypeTimer:'ゲームに表示されているタイマーを入力してください。',
 noteLimit:'攻撃は最大6件です。先に1件消してください。', noteTaken:'別の管理者が操作中です。', noteTookOver:'別の管理者に引き継がれました。',
 noteWakeNo:'ここでは画面点灯の維持に対応していません。', noteWakeRef:'画面点灯の維持が拒否されました: {m}', notePopRef:'オーバーレイが拒否されました: {m}', notePopTap:'オーバーレイが拒否されました: {m} もう一度タップしてください。', notePopNone:'このブラウザはオーバーレイに対応していません。',
 chooseRole:'役割を選んでください', lead:'リーダー', join:'参加', leadEntry:'集結リーダー · 記号 + 行軍時間', symErr:'記号は2文字にしてください', marErr:'行軍時間を入力してください', symTaken:'その記号は使用中です',
 ok:'OK', editBtn:'↩ 編集', waitingAdmin:'管理者を待っています', standingBy:'待機中', wait:'待機', standby:'待機中', readyCheck:'準備確認', ready:'準備OK', readyDone:'準備OK ✓',
 waitOthers:'他の人を待っています', notInOp:'この作戦には含まれていません', missed:'見逃し', waitNext:'次をお待ちください', cdLabel:'集結タイマー開始まで', launchIn:'{sym} 出発まで',
 send:'出発！', rallyRunning:'集結進行中', launched:'出発済み', doneLbl:'完了', DONE:'完了', waitAdminSub:'管理者をお待ちください', joinWait:'リーダーを待っています', pickRally:'集結を選んでください',
 joiningMarch:'{sym} に参加 · 行軍時間', joining:'{sym} に参加中', rallyNot:'集結はまだ始まっていません', rallyStarted:'集結開始', joinNow:'今すぐ参加！', readyQ:'準備は？',
 marchSub:'行軍 {t}', changeBtn:'↩ 変更', cdSub:'集結タイマー開始中', say_send:'出発', say_join:'集結が始まりました。今すぐ参加してください。', say_sound:'サウンドがオンになりました',
 centerMarch:'中心への行軍 {t}', defense:'防衛', sendIn:'{l} · 出発まで', thenGap:' · 次は {s}秒後', allSent:'すべて出発', checkRatios:'兵力の比率を確認してください', editMarch:'✎ 行軍時間',
 modeChange:'モード切替', modeDef:'防衛', modeAtk:'攻撃',
 admin:'管理者', logout:'ログアウト', tabAtk:'1 · 集結攻撃', tabDef:'2 · 防衛', modeConfirm:'{m}モードに切り替えますか？全プレイヤーに通知されます。役割と行軍時間は保持されます。',
 modeNameAtk:'集結攻撃', modeNameDef:'防衛', pw:'管理者パスワード', login:'ログイン', wrongPw:'パスワードが違います',
 leadersJoiners:'リーダー {a} · 参加者 {b}', confirmLeaders:'リーダーを確定', leadersLocked:'リーダー確定済み',
 hitOrder:'着弾順 · 最初の着弾が一番上', joinedN:'{n}人参加', noLeadersMsg:'リーダーがまだいません。リンクを共有し、リーダーを選んでもらってください。', leadBuffer:'開始までの余裕',
 readyCheckBtn:'準備確認', startNow:'今すぐ開始', reset:'リセット', resetOpConfirm:'作戦をリセットしますか？リーダーと参加者は入力し直します。',
 offsetsNote:'間隔: 集結どうし0.1秒、最後は+0.4秒。−と+で調整できます。', startsT:'{t}に開始', tMinus:'T−{t}', launchedLbl:'出発済み',
 stStarting:'{n}秒後に開始', stRunning:'集結作戦 進行中', stReadyWait:'準備確認: リーダー待ち', stConfirmed:'リーダー確定済み', stCollecting:'リーダー募集中', moveUp:'上へ', moveDown:'下へ',
 known:'既知の敵 · タップで入力', knownNone:'まだありません。新しい名前は0:30から始まります。', newAttack:'新しい攻撃', namePh:'名前', marchWord:'行軍', rally5:'集結 5:00', alreadyMarching:'すでに行軍中',
 timerInGame:'ゲームのタイマー', syncBtn:'同期', resyncBtn:'再同期', timeline:'タイムライン', noAttacks:'来襲する攻撃はありません。', landPlus:'着弾 +', gapLbl:'間隔 {a} → {b} {s}秒',
 clearAll:'すべて消去', clearAllConfirm:'来襲する攻撃をすべて消去しますか？', rallyW:'集結', marchW:'行軍', landedW:'着弾済み', removeBtn:'削除',
 resetDef:'防衛をリセット', resetDefConfirm:'防衛をリセットしますか？すべての攻撃と同期入力が消えます。既知の敵は残ります。', forgetAll:'すべて忘れる', forgetAllConfirm:'既知の敵をすべて忘れますか？', forgetOne:'{n}を忘れる',
 profHdr:'プロフィール', namePh2:'ゲーム内の名前', nameReq:'ゲーム内の名前を入力してください。', marHdr:'各目標への行軍時間', marReq:'5つの行軍時間をすべて入力してください。', tC:'中央', tN:'北', tS:'南', tE:'東', tW:'西', saveProf:'保存', editProf:'プロフィール編集', profSaved:'プロフィールを保存しました', pickTarget:'地図で目標を選んでください', mapHdr:'目標', defBadge:'防衛', chooseAct:'{t} · 役割を選択', defendAnyway:'それでも防衛', leave:'↺ この目標を離れる', meLine:'{n} · {t} · {r}', meNone:'{n} · 目標なし', roleLeadSym:'リーダー {s}', roleJoinOf:'{s} に参加中', roleDef:'防衛中', joinedList:'参加: {n}', nobodyJoined:'まだ参加者なし', symEntry:'{t} · 2文字の記号', groupBtn:'グループ集結', soloBtn:'単独集結', chooseMode:'{t} · {s} · グループか単独か？', unregister:'登録解除', grpNotCalled:'管理者のグループ招集を待っています', grpReset:'グループがリセットされました', rejoin:'グループに戻る', soloRatio:'{t} · {s} · 兵の比率', startBtn:'開始', ratioErr:'合計100になる兵の比率を入力してください。', ratioPh:'盾兵/爆撃兵/射手', troops:'兵 {r}', gathering:'{t} · {s} 集結中', gatheringEst:'{t} · {s} 集結中（推定）', syncGather:'同期', gatherPh:'タイマー', syncedOk:'同期しました', estTag:'推定', prepReinforce:'援軍の準備', verifying:'成功を確認中', winBtn:'攻撃成功', failBtn:'攻撃失敗', say_reinforce:'援軍の準備', say_verify:'成功を確認中', say_disband:'集結が解散しました', say_defense:'防衛に切り替え', pickLead:'{t} · 集結を選択', noLeadsHere:'{t} にはまだ集結リーダーがいません', joiningSym:'{t} · {s} に参加中', disbanded:'集結解散', pickAgain:'別の集結を選んでください', defending:'{t} · 防衛中', noIncoming:'まだ攻撃は来ていません', nowDef:'{t} は防衛中になりました。防衛していない場合は別の役割を選んでください。', youDef:'{t} の防衛になりました。', mgTarget:'目標の管理', myTargetBtn:'自分の目標', subAtk:'攻撃', subDef:'防衛', grpHdr:'グループ集結', callGroup:'グループ招集', endGroup:'グループ終了', endGroupQ:'{t} のグループを終了しますか？リーダーはグループか単独を選び直します。', setRatio:'適用', ralliesHdr:'{t} の集結', noRallies:'進行中の集結はありません。', soloTag:'単独', groupTag:'グループ', ratioOv:'比率', phGather:'集結 {x}', phGatherEst:'集結 {x}（推定）', phMarch:'行軍 {x}', phVerify:'確認中', winQ:'{t} への攻撃を成功にしますか？参加者全員が防衛に切り替わります。', failQ:'{t} への攻撃を失敗にしますか？', heldOn:'占領: はい', heldOff:'占領: いいえ', defCount:'{n}人が防衛中', audTgt:'{t} の全員', audOne:'{n}', audPlayers:'プレイヤー', audFilter:'名前で絞り込み', dupMark:'⚠ 重複', audLeadsGrp:'リーダー', audRallies:'集結の参加者', audGeneral:'全体', marNotOk:'⚠ 行軍未確認 · ゲームを見てください', marNotOkAdm:'⚠ 行軍未確認', helpReqBtn:'ヘルプを依頼', helpCancel:'ヘルプを取り消す', helpWaiting:'ヘルプを依頼中…', helpByLbl:'{n} がサポート中', helpCallBtn:'ヘルプ: {s} {n} · {t}', helpingBar:'{t} の {s} をサポート中', helpDone:'サポート終了', helpTaken:'別の管理者がすでにサポートしています。', helpNote:'{n} がサポートしています', helpRallyWait:'集結はまだ始まっていません', helpCount:'ヘルプ依頼の回数: {n}', msgB3:'ヘルプ依頼が最多', suckOne:'{n} が一番ダメ！', suckTie:'{n} がダメ！', andWord:'と', noHelpYet:'まだ誰もヘルプを依頼していません。', ctlOtherDev:'操作権は別の端末にあります', takeHere:'この端末で操作する', wakeOk:'このページを開いている間、画面はつけたままです。もう一度タップでオフ。', changeMode:'↩ グループ/単独', grpAvail:'待機中', grpAvailSub:'管理者がグループに選べます', grpPicked:'グループに選ばれました', soloQ:'単独集結にしますか？', soloQSub:'自分で率い、グループの候補から外れます。', soloYes:'はい、単独集結', soloNo:'キャンセル', backGroup:'↩ グループ候補', pickHint:'グループに入れるリーダーをタップ:', pickLocked:'グループ進行中。リーダーを変えるにはリセットしてください。', noAvail:'この目標にはまだリーダーがいません。', startGrp:'グループ集結を開始', noteSelFirst:'まずリーダーを1人以上選んでください。', youDefNote:'{t} の防衛になりました。ゲームで防衛していない？ 攻撃に戻るをタップ。', notDefQ:'ゲームで防衛していない？ 攻撃に戻るをタップ', backAtk:'↩ 攻撃に戻る', pickAtk:'攻撃する目標を選んでください。', compactBtn:'コンパクト表示', fullBtn:'通常表示', errConn:'接続エラーです。ページを再読み込みしてください。', resetConfirm2:'今の役割と記号を離れますか？名前はそのままです。', keepMarQ:'行軍時間をそのままにしますか？新しい戦いでは基地が移動していることが多いです。', keepMar:'行軍時間をそのまま', newMar:'新しい行軍時間を入力', marKept:'行軍時間をそのままにしました。', newBattleQ:'新しい戦いですか？（最後に開いてから24時間以上）', newBattleYes:'はい、新しい戦い', newBattleNo:'いいえ、同じ戦い', vVol:'音量', rpLbl:'比率プリセット', rpCustom:'カスタム', rpSetBtn:'適用', myRatio:'自分の比率', rpHdr:'比率プリセット', rpName:'プリセット名', rpAdd:'+ プリセットを追加', rpSave:'プリセットを保存', rpSaved:'比率プリセットを保存しました。', rpErr:'プリセットごとに別の名前と、合計100になる3つの数字が必要です（最大10個）。', defRatio:'防衛の比率', ovClr:'グループの比率を使う', rpSet:'比率: {r}', say_ready:'準備確認', sameRatio:'全集結で同じ比率', leadOwn:'（リーダーの選択）', youTag:'自分', lateHdr:'今すぐ出発 · 加速', lateSub:'自分の行軍 {m} · {l} 後に着弾 · {s} 加速が必要', say_late:'今すぐ出発、加速してください', cancelRally:'集結を中止', cancelQ:'この集結を中止しますか？参加者に知らせます。', rallyCancelled:'集結中止', cancelledSub:'リーダーの再開を待ってください', say_cancelled:'集結が中止されました', verLbl:'バージョン {v}', verNew:'アプリの新しいバージョンがあります。', verRefresh:'今すぐ再読み込み', repBtn:'問題を報告', repQ:'何がおかしかったですか？（任意）画面の表示内容もアプリが保存します。', repSent:'報告を送りました。ありがとうございます。', repFail:'報告を送れませんでした。ページを再読み込みしてください。', repHdr:'問題の報告', repNone:'まだ報告はありません。', repCopy:'コピー', repCopyAll:'すべてコピー', repClear:'すべて削除', repClearQ:'すべての報告を削除しますか？', repCopied:'コピーしました。Claude に貼り付けてください。', repCopyManual:'このテキストをコピー:', ctrRole:'カウンター攻撃', ctrPickSub:'DTF が中央を占領中: 防衛するか、同盟の連盟からカウンター攻撃します。', defendBtn:'防衛', ctrHdr:'カウンター攻撃', ctrSwQ:'連盟を移りましたか？', ctrSwSub:'ゲームで同盟の連盟に移ったことを確認してください。', ctrSwYes:'はい、移りました', ctrBmQ:'基地は移動しましたか？', ctrBmSub:'連盟を移ってから基地は移動しましたか？', ctrBmNo:'いいえ、同じ基地', ctrBmYes:'はい、移動しました', ctrMarQ:'中央への行軍', ctrMarSub:'新しい基地から中央への行軍時間を入力してください（分:秒）。', ctrMarErr:'0:42 のように行軍時間を入力してください。', ctrWaitSub:'中央への行軍 {m} · 開始の合図は管理者から', ctrGoT:'今すぐ開始', ctrGoSub:'{s} 前に通知', ctrGoTap:'今すぐ中央へのカウンター集結を開始し、下をタップ', ctrStarted:'集結を開始しました', say_ctrGo:'今すぐカウンター集結を開始してください', ctrAbortT:'中止', ctrAbortSub:'今すぐゲームでカウンター集結を解散してください', say_ctrAbort:'中止、カウンター集結を解散してください', ctrHoldT:'中央を守れ', ctrHoldSub:'DTF の行軍が着くまで中央で防衛し、その後すべての防衛兵を追放して中央を返してください。', ctrHandT:'今すぐ追放', ctrHandSub:'DTF の行軍が着きました: すべての防衛兵を追放して中央を返してください。', say_ctrHand:'中央を返してください、今すぐ防衛兵を追放', ctrDone:'完了 · DTF に戻る', ctrBack:'DTF に戻る', ctrNewMar:'基地が移動しました: 新しい行軍時間を入力してください。', ctrAdmHdr:'カウンター攻撃（{n}）', ctrNone:'まだカウンター攻撃者はいません。', ctrRallying:'集結中', ctrGoBtn:'カウンター開始', ctrAbBtn:'カウンター中止', ctrHandBtn:'中央を返す', ctrAbQ:'カウンター攻撃者に集結の解散を伝えますか？', ctrSent:'カウンター攻撃者に通知しました。', ctrStGo:'{s} 前に通知送信', ctrStAbort:'{s} 前に中止送信', ctrStHand:'{s} 前に返還送信', ctrTag:'カウンター', ctrLand:'着弾 {s}', ctrEarly:'早すぎ', ctrTight:'ぎりぎり', ctrGood:'良い', ctrLate:'遅い', ctrOnlyThem:'この行軍はカウンター攻撃者だけが修正します。', tdlHdr:'タワー防衛リーダー', tdlPick:'攻撃を選ぶ', tdlPickSub:'緑の攻撃をタップして担当し、急いで向かってください', tdlBeIn:'到着期限 · {l} 後に着弾', tdlLands:'着弾まで · 防衛リーダーを引き継ぐ', tdlDrop:'担当を外す', tdlTaken:'別のリーダーがその攻撃を担当しました。', tdlGone:'{t} への攻撃が削除されました: 担当終了。', say_tdlIn:'今すぐ到着してください', say_tdl:'あなたはタワー防衛リーダーです', tdlYou:'管理者があなたをタワー防衛リーダーにしました。', tdlOff:'タワー防衛リーダーではなくなりました。', tdlAdmHdr:'タワー防衛リーダー（{n}/{m}）', tdlNoLeads:'選べる集結リーダーがいません。', roleTdl:'タワー防衛リーダー', skBtn:'スキン', skHdr:'スキン', skUpload:'スキンファイルを読み込む', skEdit:'自分で作る', skEditClose:'エディターを閉じる', skAi:'AI プロンプト', skDownload:'スキンファイルを保存', skDefault:'標準スキン', skNow:'現在: {n}', skOffNow:'今回はスキン無効（skin=off）', skRadius:'角の丸み', skSt_flat:'フラット', skSt_gradient:'グラデーション', skSt_bevel:'メタル', skSt_glow:'グロー', skSt_storm:'ストーム', skF_system:'標準フォント', skF_rounded:'丸文字フォント', skF_serif:'明朝フォント', skF_mono:'タイプライター', skF_condensed:'細長フォント', skWall:'壁紙の写真', skNoWall:'壁紙なし', skDim:'暗くする', skName:'スキン名', skSave:'スキンを保存', skSaved:'この端末にスキンを保存しました。', skLoaded:'スキン「{n}」を読み込みました。', skDefOk:'標準スキン（MAD OPS）に戻しました。', sk_bg:'ページ', sk_pan:'パネル', sk_bd:'枠線', sk_tx:'文字', sk_mu:'小さい文字', sk_am:'アクセント', skTx:'文字', skPan:'パネル', skBg:'ページ', skMu:'小さい文字', skAm:'アクセント', skErrFile:'MAD OPS のスキンファイルではありません。', skErrColor:'色「{k}」は #12ab34 の形式にしてください。', skErrWall:'壁紙は画像にしてください。', skErrCon:'読みにくい: {b} の上の {a}。もっと差のある色を選んでください。', skErrAm:'アクセントがボタンの文字に対して暗すぎます。明るい色を選んでください。', skErrSpace:'この端末にスキンを保存する空きがありません。', skAiHow:'これをコピーし、[角かっこ] の部分を自分のアイデアに書き換えて、AI チャットに貼り付けてください。返事を .json ファイルで保存し、ここで読み込みます。', betaTitle:'ライブベータ', betaSub:'バージョン {v} · この戦いは新機能の実戦テストです。不具合が出るかもしれません: プレイを続けて、問題探しに協力してください。', betaNewHdr:'試してほしい新機能', betaN1:'カウンター集結: DTF が中央を占領中なら、中央 → カウンター攻撃。', betaN2:'タワー防衛リーダー: 管理者が最強のリーダーを選び、タワーからタワーへ急行させます。', betaN3:'比率プリセット: すべての比率に名前が表示されます（攻撃1、防衛2、カスタム）。', betaN4:'攻撃が近すぎて通常の出発では間に合わないとき、今すぐ出発 · 加速。', betaN5:'スキン: スキンをタップして見た目を変更。下の標準スキンで元に戻ります。', betaRepHdr:'問題が起きたら', betaR1:'できるだけ早く問題を報告（退出してやり直すの下）をタップ。画面の内容をアプリが保存します。', betaR2:'ひと言書いてください: 何をしていて、何を期待したか。例:「VX に参加、今すぐ参加！が出ない」。', betaR3:'プレイを続けてください。タイマーがおかしいときはチャットのリーダーに従ってください。', betaR4:'戦いの後、覚えていることを管理者に伝えてください。管理者がすべての報告をまとめます。', betaFoot:'MAD OPS のテストに協力いただきありがとうございます。', betaOk:'同意する', betaLink:'ベータ情報', tipNoMore:'次から表示しない', tip_lead_t:'集結リーダー', tip_lead:'この目標への攻撃集結を率います。すぐにグループ集結の候補になります: 管理者がリーダーを選び、準備確認を始めます。自分で始めるなら単独集結を選んでください。自分の比率で、自分の集結だけの兵の比率を決められます。', tip_solo_t:'単独集結', tip_solo:'この集結は自分で始めます。比率を選び、ゲームで集結を始めたら開始をタップし、ゲームの集結タイマーを入力して同期します。参加者はあなたのタイマーに従います。集結を中止すると止まり、参加者に知らせます。', tip_join_t:'集結に参加', tip_join:'1人の集結リーダーに従います。地図の色: 緑 = まだ行軍前、黄色の点滅 = 20秒以内に行軍、赤の点滅 = 5秒以内、赤 = 行軍中。リーダーが始めると比率と一緒に今すぐ参加！が出ます: ゲームで参加してください。', tip_def_t:'防衛', tip_def:'管理者が攻撃を同期すると、自分の行軍に合わせた出発タイマーが出て、援軍が攻撃の直後に着きます。攻撃が近すぎるときは、必要な加速量と一緒に今すぐ出発 · 加速が出ます。', tip_ctr_t:'カウンター攻撃', tip_ctr:'同盟の連盟から中央を攻撃し、強い敵の攻撃の直後、弱った敵の防衛兵の上に着弾させます。開始の合図は管理者から。成功したら DTF の行軍が着くまで中央を守り、その後返します。', tip_tdl_t:'タワー防衛リーダー', tip_tdl:'タワーからタワーへ急行し、攻撃の着弾前に防衛リーダーを引き継ぎます。緑の攻撃が次に守る攻撃です。担当するともう1人のリーダーは選べません。到着期限は着弾の10秒前です。', tip_ratio_t:'比率プリセット', tip_ratio:'管理者が戦いの前に用意した名前付きの比率を選ぶか、カスタムで自分の比率を入力します。集結の全員に名前と数字が表示されます。数字をタップするとカスタムに切り替わります。', tip_skin_t:'スキン', tip_skin:'この端末でアプリの見た目を変えます: 内蔵スキンを選ぶ、自分で作る、友だちから届いたファイルを読み込む。集結と警告の色は変わりません。ページ下の標準スキンでいつでも元に戻せます。', tip_compact_t:'コンパクト表示', tip_compact:'大きなボタン付きのタイマー枠だけを表示します。ゲームの横のフローティングウィンドウや画面分割向けです。通常表示でページに戻ります。', tip_pop_t:'オーバーレイ', tip_pop:'タイマー枠をゲームの上に浮かぶ小さなウィンドウに出します。PC ではボタンが使えます。スマホでは枠の画像になります。', tip_report_t:'問題を報告', tip_report:'画面の内容とアプリの状態を、メモと一緒に管理者向けに保存します。おかしいと思ったらすぐ使って、プレイを続けてください。', tip_help_t:'ヘルプを依頼', tip_help:'自分の集結について管理者に助けを求めます。最初に応じた管理者が、代わりにタイマーを同期・調整できます。', tip_admAtk_t:'グループ集結', tip_admAtk:'単独でないリーダー全員が表示されます。使うリーダーをタップし、順番と比率を決めて、グループ集結を開始。リーダーが準備OKを押すとカウントダウンが自動で始まります。', tip_admDef_t:'来ている攻撃', tip_admDef:'ゲームのタイマーで敵の攻撃を1つずつ同期します。この目標の防衛者は自分の行軍に合わせた出発タイマーを受け取ります。新しい敵の行軍は、ライブで調整するまで30秒の推定です。防衛の比率もここで設定します。', tip_admCtr_t:'カウンター攻撃', tip_admCtr:'カウンター攻撃者がここに表示されます。強い敵の攻撃が見えたらカウンター開始、集結中にやめるならカウンター中止、DTF の行軍が中央に着いたら中央を返す。集結は青いカウンターのチップから同期します。', tip_admTdl_t:'タワー防衛リーダー', tip_admTdl:'タワー間を急行する強い集結リーダーを最大2人選びます。次に守る攻撃を見て、タワーごとに1つずつ担当します。', tip_admRp_t:'比率プリセット', tip_admRp:'戦いの前に兵の比率に名前と値を付けておきます。全員が一覧から選ぶので、戦闘中の入力が減ります。', tip_admRep_t:'問題の報告', tip_admRep:'戦闘中に届いた報告と、その時の画面の内容です。すべてコピーして Claude に貼り付けてください。', tutLater:'チュートリアルは今後のアップデートで戻ります。', betaAgree:'MAD OPS を使うことで、DTF または ROS 以外の人と共有しないことに同意したことになります。', refHdr:'共有されたリンク', refLine:'{k}人を招待:', refNone:'まだ共有リンクから来た人はいません。', refNoTag:'リンク記録なしで開いた: {k}', refUnknown:'不明なリンク {c}', shareBtn:'仲間用のリンクをコピー', shareNeedName:'先にゲーム内の名前を保存してください。', shareText:'MAD OPS: DTF/ROS の集結タイマー。DTF・ROS 以外には共有しないでください。', shareDone:'共有しました。DTF・ROS の仲間だけにしてください。', shareCopied:'リンクをコピーしました。DTF・ROS の仲間だけに送ってください。', nbBtn:'新しい戦いにリセット', nbQ:'新しい戦いを始めるには RESET と入力してください。全員が行軍時間の入力に戻ります（名前は残ります）。攻撃、集結、占領中の目標、保存した敵、カウンター、タワーの担当はすべて消えます。', nbNo:'リセットしませんでした: RESET と入力されていません。', nbSent:'全員にリセットを送りました。', nbNeedCtl:'リセットできるのは操作権を持つ管理者だけです。', nbDone:'新しい戦い: すべてリセットされました。行軍時間を入力してください。', shareFail:'リンクをコピーできませんでした。もう一度お試しください。', notAdmin:'このアカウントは管理者リストにありません。オーナーに管理者セクションで追加してもらってください。', notAdminErr:'ログインしましたが、このアカウントは管理者リストにありません。オーナーに追加してもらってください。', tooMany:'試行回数が多すぎます。しばらく（最大1時間）待ってから、もう一度お試しください。', admHdr:'管理者', admHow:'Firebase Authentication でアカウント（メールとパスワード）を作成し、ここにメールを追加します。オーナー（★）がこのリストを変更できます。', admFixed:'セキュリティルールに組み込まれた管理者はここに表示されません。', admOwner:'オーナー', admOwnerTip:'オーナーは管理者を追加・削除できます', admAdd:'管理者を追加', admBad:'完全なメールアドレスを入力してください。', admHave:'そのメールはすでに管理者です。', admRmQ:'{e} を管理者から外しますか？', admSaved:'管理者リストを保存しました。', admFail:'保存できませんでした。リストを変更できるのはオーナーだけです（先に新しいルールを公開してください）。', helpBtn:'? ヘルプ', helpTitle:'MAD OPS ヘルプ', helpClose:'閉じる', helpWhatH:'MAD OPSとは？', helpWhat1:'MAD OPSは、Supreme PrisonとSvSの戦いのためのDTFのバトルタイマーです。プレイはこれまで通りゲームで行い、MAD OPSが開始・参加・出発のタイミングを正確に知らせるので、全員の行軍が同時に到着します。', helpWhat2:'目的：チャットでのカウントダウンはもう不要です。管理者が1つの画面で戦いを指揮し、全員のスマホの時計がそれに合わせられ、あなたの画面には次にやることだけが表示されます。そのおかげでDTFはより強く攻め、よりうまく守れます。', helpBetaH:'ライブベータとは？', helpBeta1:'ベータはテスト版です。今回は本番の戦いですが、アプリの一部の機能は戦闘で初めて使われるため、うまく動かないことがあるかもしれません。', helpBeta2:'おかしいと思ったら、ゲームを続けてチャットのリーダーに従ってください。手が空いたら、問題を報告（退出してやり直すの隣）を押して管理者に知らせてください。', helpStartH:'はじめに', helpS1:'画面の一番上で言語を選び、合図が聞こえるようにサウンドボタンをサウンドオンになるまで押してください。', helpS2:'ゲーム内の名前と、5つの目標それぞれへの行軍時間を分:秒（例 0:42）で入力し、保存を押してください。目標に部隊を送るとき、ゲームに行軍時間が表示されます。', helpS3:'マップで、行くように言われた目標をタップしてください。', helpS4:'役割を選んでください。DTFがすでにその目標を占領している場合は、防衛に設定されます。', helpBoxH:'大きなボックスを見る', helpBox:'一番上の大きなボックスが、今やることをいつも教えてくれます。待機中は待つという意味です。緑になったら、すぐにゲームで行動してください。', helpRolesH:'かんたんな役割', helpJoin:'参加者（参加）：参加する集結リーダーの記号をタップして待ちます。ボックスが緑になり今すぐ参加！と出たら、表示された兵種比率でゲーム内のその集結に参加してください。', helpDef:'防衛者：DTFが占領している目標を援軍で守ります。タイマーが0になりボックスに出発！と出たら、ゲームで援軍を送ってください。今すぐ出発 · 加速は、すぐに送って行軍を加速するという意味です。', helpLead:'集結リーダー（リーダー）：経験のあるプレイヤー向けです。初めて選んだときに短いヒントで説明します。', helpBtnsH:'便利なボタン', helpB1:'オーバーレイを表示：ゲームの上に小さなタイマー窓を出します。', helpB2:'画面をつけたままにする：画面が消えないようにします。', helpB3:'コンパクト表示：タイマーボックスだけを表示します。ゲームと並べる分割画面に便利です。', helpB4:'退出してやり直す：役割を外して選び直せます。名前はそのままで、行軍時間を残すかどうか聞かれます。', helpAsk:'まだわからない？同盟チャットで聞いてください。迷ったら、ゲーム内のリーダーに従ってください。', helpTips:'機能のヒントをもう一度表示', helpTipsOk:'各機能を使うときに、ヒントがまた表示されます。', betaHelp:'MAD OPSは初めてですか？画面の一番上の ? ヘルプで簡単な案内を見られます。', helpSyncH:'そろえてくれるもの', helpSync1:'集結：集結リーダーごとに、自分の行軍に合わせた開始時刻が出るので、別々の拠点からの集結が同時に目標を攻撃します。', helpSync2:'参加者：リーダーの集結が開いた瞬間に知らせるので、時間内に集結がいっぱいになります。', helpSync3:'防衛：あなた自身の行軍時間から出発時刻を計算するので、援軍が敵の攻撃の直後に到着します。', helpSync4:'合図：管理者のメッセージと音声の合図が、全員に同じ瞬間に届きます。'
}
};

let lang = 'en';
try { lang = localStorage.getItem('tacsync_lang') || (navigator.language || 'en').slice(0, 2).toLowerCase(); } catch (e) {}
if (!LANGS[lang]) lang = 'en';
function tr(k, p){
  const d = L[lang];
  let s = d && d[k] != null ? d[k] : (L.en[k] != null ? L.en[k] : k);
  if (p) for (const x in p) s = s.split('{' + x + '}').join(p[x]);
  return s;
}


//#PURE-START
function parseMS(t){
  t = String(t == null ? '' : t).trim();
  if (!t) return null;
  if (t.includes(':')){
    const p = t.split(':'), m = parseInt(p[0] || '0', 10), s = parseFloat(p[1] || '0');
    if (isNaN(m) || isNaN(s)) return null;
    return m * 60 + s;
  }
  if (t.includes('.')){ const f = parseFloat(t); return isNaN(f) ? null : f; }
  const d = t.replace(/\D/g, '');
  if (!d) return null;
  if (d.length <= 2) return parseInt(d, 10);
  return parseInt(d.slice(0, -2), 10) * 60 + parseInt(d.slice(-2), 10);
}
function fmtMS(sec){
  if (sec == null || isNaN(sec)) return '--';
  const t = Math.round(sec * 10) / 10, m = Math.floor(t / 60), s = Math.round((t - m * 60) * 10) / 10;
  return m + ':' + (s < 10 ? '0' : '') + (s % 1 ? s.toFixed(1) : String(s));
}
function fmtCount(ms){
  if (ms < 0) ms = 0;
  const d = Math.round(ms / 100); /* tenths, rounded once, so 59.96 s never shows as 0:60.0 */
  if (d >= 600){ const m = Math.floor(d / 600), r = (d % 600) / 10; return m + ':' + (r < 10 ? '0' : '') + r.toFixed(1); }
  return (d / 10).toFixed(1);
}
function defaultOffsets(n){
  const o = [];
  for (let i = 0; i < n; i++){
    if (i < n - 1) o.push(Math.round(i * 10) / 100 * 1);
    else o.push(n === 1 ? 0 : Math.round(((n - 2) * 0.1 + 0.4) * 10) / 10);
  }
  return o.map(x => Math.round(x * 10) / 10);
}
function buildPlan(leaders, bufferSec, startMs){
  let need = -Infinity;
  leaders.forEach(l => { need = Math.max(need, l.march - l.off); });
  const baseHit = startMs + bufferSec * 1000 + need * 1000;
  const hit = {}, launch = {};
  leaders.forEach(l => { hit[l.uid] = Math.round(baseHit + l.off * 1000); launch[l.uid] = hit[l.uid] - Math.round(l.march * 1000); });
  return { baseHit: Math.round(baseHit), hit, launch };
}
function waveInfo(waves){
  const s = [...waves].sort((a, b) => a.landAt - b.landAt);
  return s.map((w, i) => {
    const gap = i ? (w.landAt - s[i - 1].landAt) / 1000 : null;
    return Object.assign({}, w, { label: 'A' + (i + 1), gap: gap, urgent: gap !== null && gap <= 1.0 });
  });
}
function launchList(waves, march){
  return waveInfo(waves).map(w => ({ id: w.id, label: w.label, name: w.name, landAt: w.landAt, gap: w.gap, urgent: w.urgent,
    L: w.landAt + (w.off == null ? 0.4 : w.off) * 1000 - march * 1000 })).sort((a, b) => a.L - b.L);
}
function defState(list, t){
  for (let i = 0; i < list.length; i++){
    const nextL = list[i + 1] ? list[i + 1].L - list[i].L : 1500;
    const end = list[i].L + Math.min(1500, Math.max(0, nextL));
    if (t < end){
      const it = list[i];
      return { kind: t >= it.L ? 'send' : 'count', i: i, rem: it.L - t, left: list.length - i, item: it,
        nextGap: list[i + 1] ? (list[i + 1].L - it.L) / 1000 : null };
    }
  }
  const last = list[list.length - 1];
  if (last && t < last.L + 1500 + 10000) return { kind: 'done' };
  return { kind: 'idle' };
}
//#PURE-END


const BRAND_BANNER = 'data:image/jpeg;base64,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', BRAND_ICON = 'data:image/png;base64,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';
//#PURE2-START
const TARGETS = ['N', 'W', 'C', 'E', 'S'];
const GATHER_MS = 300000, FRESH_P = 12 * 60000;
/* Who a message is for, judged from the player's own assignment. m.aud: all | tgt | leads | lead | joiners | rally | one. */
function msgFor(m, u, me){
  if (!m) return false;
  me = me || {};
  if (m.aud === 'all') return true;
  if (m.aud === 'tgt') return !!me.tgt && me.tgt === m.to;
  if (m.aud === 'leads') return me.role === 'lead' && !!me.sym;
  if (m.aud === 'lead' || m.aud === 'one') return m.to === u;
  if (m.aud === 'joiners') return me.role === 'join' && !!me.rally;
  if (m.aud === 'rally') return me.role === 'join' && me.rally === m.to;
  return false;
}
/* A saved enemy's march changed (and is now confirmed): move the landing of that enemy's attacks that have not landed yet. */
function retimeWaves(W, name, march, t){
  return W.map(w => {
    if (w.name !== name || w.landAt <= t) return w;
    const n = Object.assign({}, w, { march: march, mc: true });
    if (w.rallyEnd) n.landAt = w.rallyEnd + Math.round(march * 1000);
    return n;
  });
}
/* Ratio presets, set by the admin before the fight. A ratio is stored as "Name|40/30/30" so everyone sees its name. */
const RP0 = [{ n: 'Attack 1', r: '40/30/30' }, { n: 'Attack 2', r: '50/30/20' }, { n: 'Defense 1', r: '60/20/20' }, { n: 'Defense 2', r: '50/25/25' }];
function rSplit(s){ s = String(s || ''); const i = s.lastIndexOf('|'); return i < 0 ? { n: '', r: s } : { n: s.slice(0, i), r: s.slice(i + 1) }; }
function fmtR(s){ const x = rSplit(s); return x.r ? (x.n ? x.n + ' · ' : '') + x.r : ''; }
/* Troop ratio Shieldbearers/Bombers/Shooters: three whole numbers 0-100 that add up to 100. */
function parseRatio(a, b, c){
  const p = [a, b, c].map(x => String(x == null ? '' : x).trim());
  if (p[2] === '' && p[0] !== '' && p[1] !== '') p[2] = String(100 - parseInt(p[0], 10) - parseInt(p[1], 10));
  const n = p.map(x => (/^\d{1,3}$/.test(x) ? parseInt(x, 10) : NaN));
  if (n.some(x => isNaN(x) || x < 0 || x > 100) || n[0] + n[1] + n[2] !== 100) return null;
  return n.join('/');
}
/* One rally's timeline. S = start (lead taps start in the game), G = gather ends, land = hit.
   Syncs and march corrections only count if made after this rally started. Latest wins. */
function rallyTimes(S, march, gsList, moList){
  if (S == null) return null;
  const pick = arr => (arr || []).filter(x => x && x.at >= S - 5000).sort((a, b) => b.at - a.at)[0] || null;
  const gs = pick(gsList), mo = pick(moList);
  const G = gs ? gs.g : S + GATHER_MS, M = mo ? mo.m : (march || 0);
  return { S: S, G: G, M: M, land: G + Math.round(M * 1000), synced: !!gs };
}
function rallyPhase(rt, t){
  if (!rt) return 'none';
  if (t < rt.S) return 'pre';
  if (t < rt.G) return 'gather';
  if (t < rt.land) return 'march';
  return 'verify';
}
//#PURE2-END


const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const box = $('box'), lab = $('lab'), tim = $('tim'), sub = $('sub'), ctrl = $('ctrl'), cntEl = $('cnt');
const adminSec = $('adminSec');
const TNAME = { C: 'tC', N: 'tN', S: 'tS', E: 'tE', W: 'tW' };
const tn = T => tr(TNAME[T] || 'tC');

/* ---------- local profile and assignment ----------
   Kept on the device and mirrored to the player's own document so the admin and joiners can see it. */
const PROF0 = { name: '', mar: {}, tgt: null, role: null, sym: '', mode: null, rally: null, solo: null, gs: null, mo: null, readyAt: 0, ep: 0, ratio: '', won: null, helpReq: 0, helps: 0 };
let prof = Object.assign({}, PROF0);
try { Object.assign(prof, JSON.parse(localStorage.getItem('tacsync_prof2') || '{}')); } catch (e) {}
prof.mar = prof.mar || {};
const saveProf = () => { try { localStorage.setItem('tacsync_prof2', JSON.stringify(prof)); } catch (e) {} };
/* One live room for the whole alliance. */
const roomKey = 'R261';
const profileDone = () => !!prof.name && TARGETS.every(T => prof.mar[T] > 0);

/* ---------- state ---------- */
let app, auth, db, uid = null, pid = null, D = null, unsub = null, live = false;
const CV = { tx: '#e6edf3', mu: '#9fb0c3', am: '#f5b301', bd: '#2b374a' }; /* drawing colors for the phone pop-out; a skin changes them */
let offset = 0, rttMs = null, netState = 'connecting', wake = null;
let isAdmin = false, hbTimer = null, ctlTimer = null, ctlUnsub = null;
let C = null, adminName = '', prevHolder, vacantSince = null, claiming = false, myReqSent = false; const seenReq = new Set();
let lastKey = null;
const LEADS = new Map(), PL = new Map(), MYJ = new Map(), MYLEAD = new Map();
let leadsUnsub = null, plUnsub = null, myjUnsub = null, myjFor = null, mylUnsub = null, mylFor = null;
const ui = { helping: null, editProf: false, pickT: null, editSym: false, disbandAt: 0, disbandSym: '', mgT: null, sub: 'atk' };
const bar = { phase: 'rally', editId: null };
const starting = new Set(), handledRes = new Set(), prevHeld = {};
let soundOn = false, actx = null; const fired = new Set();
const TUT = { on: false };
const MSG = { cur: null, seen: null, shownAt: 0, closed: false, voxSeen: null };
const CLIP = { buf: {}, state: {}, p: null, vver: {}, vload: {}, raw: {}, vg: {} };
let voiceMode = 'dev', popped = false;
try { if (localStorage.getItem('tacsync_voice') === 'rec') voiceMode = 'rec'; } catch (e) {}
const now = () => Date.now() + offset;
/* One id per device, so one admin account on two devices counts as two players and only one of them holds control. */
const DEV = (() => { let d = ''; try { d = localStorage.getItem('tacsync_dev') || ''; if (!d){ d = Math.random().toString(36).slice(2, 10); localStorage.setItem('tacsync_dev', d); } } catch (e) { d = Math.random().toString(36).slice(2, 10); } return d; })();
function setIds(){ uid = auth.currentUser.uid; pid = auth.currentUser.isAnonymous ? uid : uid + '_' + DEV; refTag(); }
const roomRef = () => doc(db, 'rooms', roomKey);
const playersCol = () => collection(db, 'rooms', roomKey, 'players');
const meRef = () => doc(db, 'rooms', roomKey, 'players', pid);

function note(msg, keep){ $('note').textContent = msg || ''; if (msg && !keep) setTimeout(() => { if ($('note').textContent === msg) $('note').textContent = ''; }, 6000); }
let switching = false; /* true while the account changes: feeds are paused and their errors ignored */
function fail(e){
  if (switching) return;
  const c = (e && e.code) || '';
  if (isAdmin && /permission/.test(c)) note(tr('notAdminErr'), true);
  else if (/permission|unauthenticated|unavailable|network|deadline|cancelled|internal/.test(c)) note(tr('errConn'), true);
  else if (c.includes('operation-not-allowed') || c.includes('admin-restricted')) note(tr('errAuth'), true);
  else note(tr('errGeneric', { m: e && e.message ? e.message : e }), true);
}
const upd = obj => updateDoc(roomRef(), obj).catch(fail);

/* Write the player's own document from the local profile. */
function myDocData(){
  return { name: prof.name, mar: prof.mar, target: prof.tgt || null, role: prof.role || null, sym: prof.role === 'lead' ? (prof.sym || '') : '',
    mode: prof.role === 'lead' ? (prof.mode || null) : prof.role === 'counter' ? 'solo' : null, rally: prof.role === 'join' ? (prof.rally || null) : null,
    solo: (prof.role === 'lead' && prof.mode === 'solo') || prof.role === 'counter' ? (prof.solo || null) : null, gs: prof.gs || null, mo: prof.mo || null,
    readyAt: prof.readyAt || 0, ep: prof.ep || 0, won: prof.won || null, lr: prof.role === 'lead' && prof.mode !== 'solo' ? (prof.lr || null) : null, cx: prof.role === 'lead' ? (prof.cx || null) : null, cwon: prof.role === 'counter' ? (prof.cwon || null) : null, rc: refCode(), rb: refBy() || null, helpReq: prof.role === 'lead' ? (prof.helpReq || 0) : 0, helps: prof.helps || 0, hb: Math.round(now()), t: prof.t || Math.round(now()) };
}
let holdPush = false; /* while "Is this a new battle?" is unanswered, yesterday's role is not published */
function pushMe(){
  saveProf();
  if (!db || !pid || holdPush) return Promise.resolve();
  return setDoc(meRef(), myDocData(), { merge: true }).catch(fail);
}
function setMe(fields){ Object.assign(prof, fields); invalidate(); return pushMe(); }
/* A new assignment replaces the old one. */
function assign(T, role){
  ui.pickT = null; ui.editSym = false;
  const keepSym = prof.sym;
  return setMe({ fromWin: null, tgt: T, role: role, sym: keepSym, mode: null, rally: null, solo: null, gs: null, mo: null, readyAt: 0, ep: 0, won: null, helpReq: 0, lr: null, t: Math.round(now()) }).then(() => clearHelpBy());
}
/* Help from an admin: the lead asks, one admin answers and can then sync and adjust this lead's rally. */
let helpBy = null;
function clearHelpBy(){ if (!db || !pid || !helpBy) return Promise.resolve(); helpBy = null; return updateDoc(meRef(), { helpBy: null }).catch(() => {}); }
const playerRef = u => doc(db, 'rooms', roomKey, 'players', u);

/* ---------- language ---------- */
function refreshStatic(){
  $('net').textContent = tr(netState === 'live' ? 'live' : netState === 'off' ? 'offline' : 'connecting');
  $('net').className = 'pill ' + (netState === 'live' ? 'live' : netState === 'off' ? 'off' : '');
  $('sync').textContent = rttMs == null ? tr('clockNone') : tr('clockPill', { n: Math.round(rttMs / 2) });
  let sp = false; try { sp = sndPref && !actx; } catch (e) {}
  $('sound').textContent = tr(soundOn || sp ? 'soundOn' : 'soundOff');
  try { $('compact').textContent = tr(compact ? 'fullBtn' : 'compactBtn'); } catch (e) {}
  try { skinLabels(); } catch (e) {}
  try { helpLabels(); } catch (e) {}
  const wOn = !!(wake && !wake.released);
  $('wake').textContent = (wOn ? '✓ ' : '') + tr(wOn ? 'wakeOn' : 'wakeBtn'); $('wake').className = wOn ? 'go' : 'alt';
  const vb = $('voiceBtn'); if (vb) vb.textContent = tr(voiceMode === 'rec' ? 'voiceRec' : 'voiceDev');
}
function applyLang(){
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i]').forEach(el => { el.textContent = tr(el.dataset.i); });
  document.querySelectorAll('[data-al]').forEach(el => { el.setAttribute('aria-label', tr(el.dataset.al)); });
  const sel = $('lang');
  if (!sel.options.length) Object.keys(LANGS).forEach(k => { const o = document.createElement('option'); o.value = k; o.textContent = LANGS[k]; sel.append(o); });
  sel.value = lang;
  refreshStatic();
}
$('lang').onchange = e => {
  lang = e.target.value; try { localStorage.setItem('tacsync_lang', lang); } catch (x) {}
  applyLang(); invalidate(); renderProfile(true);
  if (isAdmin){ msgUI.sig = ''; adminSec.innerHTML = skel(); renderAdmin(); }
  else if (adminSec.querySelector('#pw')) loginForm();
  tick();
};

/* ---------- room helpers ---------- */
function initialDoc(){ const tg = {}; TARGETS.forEach(T => { tg[T] = { held: false, waves: [], enemies: [] }; }); return { v: 2, tg: tg }; }
async function ensureRoom(){
  const r = roomRef();
  await runTransaction(db, async tx => { const s = await tx.get(r); if (!s.exists()) tx.set(r, initialDoc()); });
}
const TG = T => ((D && D.tg && D.tg[T]) || {});
function grpOf(T){
  return Object.assign({ on: false, stage: 'lobby', confirmed: false, sel: {}, order: [], off: {}, buffer: 10, cdEnd: 0, plan: null, epoch: 0, rcAt: 0, ratio: '', rOv: {} }, TG(T).grp || {});
}
const wavesOf = T => TG(T).waves || [];
const enemiesOf = T => TG(T).enemies || [];
const inDef = T => !!TG(T).held || wavesOf(T).length > 0;
const fresh = p => !!p && now() - (p.hb || 0) < FRESH_P;
/* Everyone's player documents: admins see all players, everyone sees the leads. */
function pdoc(u){ if (u === pid) return Object.assign({ uid: pid }, myDocData()); return PL.get(u) || LEADS.get(u) || MYLEAD.get(u) || null; }
function leadsOn(T){
  const src = isAdmin ? PL : LEADS, out = [];
  src.forEach((p, u) => { if (u !== pid && p.role === 'lead' && p.target === T && p.sym && fresh(p)) out.push(Object.assign({ uid: u }, p)); });
  if (prof.role === 'lead' && prof.tgt === T && prof.sym) out.push(pdoc(pid));
  return out.sort((a, b) => (a.t || 0) - (b.t || 0));
}
/* Every lead on T who has not chosen a solo rally can be picked for a group. */
const availLeads = T => leadsOn(T).filter(p => p.mode !== 'solo');
/* Leads the admin picked for the group on target T, in hit order. */
function groupLeads(T){
  const g = grpOf(T), ord = g.order || [], sel = g.sel || {};
  return availLeads(T).filter(p => sel[p.uid]).sort((a, b) => {
    const ia = ord.indexOf(a.uid), ib = ord.indexOf(b.uid);
    if (ia >= 0 && ib >= 0) return ia - ib;
    if (ia >= 0) return -1;
    if (ib >= 0) return 1;
    return (a.t || 0) - (b.t || 0);
  });
}
function offsetsFor(T, Ls){
  const d = defaultOffsets(Ls.length), o = grpOf(T).off || {};
  return Ls.map((l, i) => (o[l.uid] != null ? o[l.uid] : d[i]));
}
function joinersOf(leadUid){
  const out = [];
  if (isAdmin) PL.forEach((p, u) => { if (p.role === 'join' && p.rally === leadUid && fresh(p)) out.push(Object.assign({ uid: u }, p)); });
  else if (leadUid === pid) MYJ.forEach((p, u) => { if (p.role === 'join' && p.rally === pid && fresh(p)) out.push(Object.assign({ uid: u }, p)); });
  return out.sort((a, b) => String(a.name).localeCompare(String(b.name)));
}
/* The timeline of lead u's current rally, or null if it has not started. */
function rallyOf(u){
  const p = pdoc(u); if (!p || (p.role !== 'lead' && p.role !== 'counter') || !p.target) return null;
  const T = p.target, g = grpOf(T), ov = ((TG(T).ov || {})[u]) || {};
  let S = null;
  if (p.mode !== 'solo'){ if (g.stage === 'countdown' && g.plan && g.plan.launch && g.plan.launch[u] != null) S = g.plan.launch[u]; }
  else if (p.mode === 'solo' && p.solo && p.solo.start) S = p.solo.start;
  const rt = rallyTimes(S, (p.mar || {})[T], [p.gs, ov.gs], [p.mo, ov.mo]);
  if (rt){ rt.T = T; rt.uid = u; rt.mode = p.mode === 'solo' ? 'solo' : 'group'; }
  return rt;
}
const presets = () => (D && Array.isArray(D.rp) && D.rp.length ? D.rp : RP0);
/* A group lead's ratio: the admin's group ratio, the admin's ratio for this lead, or the lead's own pick. Latest wins. */
function ratioOf(u){
  const p = pdoc(u); if (!p) return '';
  if (p.mode === 'solo') return (p.solo && p.solo.ratio) || '';
  const g = grpOf(p.target), ov = (g.rOv || {})[u], c = [{ r: g.ratio, at: g.rAt || 0 }];
  if (ov) c.push(typeof ov === 'string' ? { r: ov, at: 1 } : ov);
  if (p.lr && p.lr.r) c.push(p.lr);
  const best = c.filter(x => x.r).sort((a, b) => b.at - a.at)[0];
  return best ? best.r : '';
}
function resOf(rt){ if (!rt) return null; const r = ((TG(rt.T).res || {})[rt.uid]); return r && r.S === rt.S ? r : null; }

/* ---------- clock sync ---------- */
let clockBusy = false, clockAt = 0, clockBase = null;
const clockBaseNow = () => Date.now() - performance.now();
async function syncClock(){
  if (!db || !uid || clockBusy) return;
  clockBusy = true;
  try { await syncClockOnce(); } finally { clockBusy = false; clockAt = performance.now(); clockBase = clockBaseNow(); }
}
/* Clock-jump watch, no reads: the device clock and the browser's steady timer move together unless the device clock
   is changed (network time correction, manual change, sleep). A gap over 0.25 s triggers a clock check at once. */
setInterval(() => {
  if (clockBase == null || clockBusy) return;
  if (Math.abs(clockBaseNow() - clockBase) > 250 && performance.now() - clockAt > 10000) syncClock();
}, 1000);
/* Re-check when the page comes back to the front (3 reads each time). Set to false to drop it if reads run high. */
const RECHECK_ON_RETURN = true;
document.addEventListener('visibilitychange', () => {
  if (RECHECK_ON_RETURN && document.visibilityState === 'visible' && clockBase != null && performance.now() - clockAt > 30000) syncClock();
});
async function syncClockOnce(){
  const r = doc(db, 'clocks', uid); let best = null;
  for (let i = 0; i < 3; i++){
    try {
      const t0 = Date.now(); await setDoc(r, { t: serverTimestamp() }); const t1 = Date.now();
      const s = await getDocFromServer(r), st = s.data() && s.data().t && s.data().t.toMillis();
      if (!st) continue;
      const rtt = t1 - t0;
      if (!best || rtt < best.rtt) best = { rtt: rtt, off: st - (t0 + t1) / 2 };
    } catch (e) { return; }
  }
  if (best){ offset = rttMs == null ? best.off : offset * 0.5 + best.off * 0.5; rttMs = best.rtt; }
  refreshStatic();
}

/* ---------- audio ---------- */
function beep(f, ms){
  if (!soundOn || !actx) return;
  const o = actx.createOscillator(), v = actx.createGain();
  o.frequency.value = f; v.gain.value = 0.2; o.connect(v); v.connect(actx.destination);
  o.start(); o.stop(actx.currentTime + ms / 1000);
}
function say(text){
  if (soundOn && 'speechSynthesis' in window){
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text); u.lang = VOICE[lang] || 'en-US'; speechSynthesis.speak(u);
  }
}
function cue(key, f, ms, text, vib, clip){
  if (fired.has(key)) return; fired.add(key);
  beep(f, ms);
  if (!(soundOn && voiceMode === 'rec' && clip && playClip(clip)) && text) say(text);
  if (navigator.vibrate) navigator.vibrate(vib);
}
/* Sound is on by default. Phones allow sound only after a tap, so the first tap anywhere switches it on,
   unless this player switched sound off on this device. */
let sndPref = true; try { sndPref = localStorage.getItem('tacsync_snd') !== '0'; } catch (e) {}
function soundUp(announce){
  actx = actx || new (window.AudioContext || window.webkitAudioContext)(); actx.resume();
  soundOn = true; beep(660, 150); refreshStatic();
  if (voiceMode === 'rec'){ loadClips().then(() => { if (announce && !playClip('so')) say(tr('say_sound')); }); loadVoices(); }
  else { if (announce) say(tr('say_sound')); if (isAdmin) loadClips(); }
}
const firstTap = e => {
  ['pointerdown', 'keydown'].forEach(k => document.removeEventListener(k, firstTap, true));
  if (sndPref && !soundOn && !(e.target && e.target.closest && e.target.closest('#sound'))) soundUp(false);
};
['pointerdown', 'keydown'].forEach(k => document.addEventListener(k, firstTap, true));
$('sound').onclick = () => {
  if (soundOn){
    soundOn = false; sndPref = false; try { localStorage.setItem('tacsync_snd', '0'); } catch (e) {}
    try { speechSynthesis.cancel(); } catch (e) {}
    refreshStatic(); return;
  }
  sndPref = true; try { localStorage.setItem('tacsync_snd', '1'); } catch (e) {}
  soundUp(true);
};
/* A message that appears only on this device (for example after a capture). */
function localMsg(text){ MSG.cur = { k: 'local', text: text }; MSG.shownAt = Date.now(); MSG.closed = false; beep(740, 180); }


/* ---------- views: what the overlay box shows ---------- */
const V = (key, o) => Object.assign({ key: key, cls: 'idle', label: '', time: '', sub: '', ctrl: '', cnt: null, rem: null, go: false, cid: key }, o);
const btn = (act, txt, cls, extra) => '<button class="' + (cls || '') + '" data-act="' + act + '" ' + (extra || '') + '>' + txt + '</button>';
const ratioInputs = (pre, r) => {
  const p = String(r || '').split('/');
  return '<span class="ratio" dir="ltr">' + [0, 1, 2].map(i => '<input id="' + pre + i + '" class="rt" inputmode="numeric" maxlength="3" value="' + esc(p[i] || '') + '" aria-label="' + esc(tr('ratioPh')) + ' ' + (i + 1) + '">').join('/') + '</span>';
};
/* Ratio picker: every preset plus Custom. The three boxes only open for typing when Custom is picked.
   Picking a preset applies at once; Custom applies with Set. */
function ratioPick(pre, cur, noSet){
  const P = presets(), x = rSplit(cur);
  let idx = P.findIndex(p => p.n === x.n && p.r === x.r); if (!x.r) idx = 0;
  const custom = idx < 0, nums = String(custom ? x.r : P[idx].r).split('/');
  return '<span class="rpick"><select id="' + pre + 's" data-rp="' + pre + '" aria-label="' + esc(tr('rpLbl')) + '">' +
    P.map((p, i) => '<option value="' + i + '"' + (i === idx ? ' selected' : '') + '>' + esc(p.n) + ' · ' + esc(p.r) + '</option>').join('') +
    '<option value="c"' + (custom ? ' selected' : '') + '>' + esc(tr('rpCustom')) + '</option></select>' +
    '<span class="ratio" dir="ltr">' + [0, 1, 2].map(i => '<input id="' + pre + i + '" data-rq="' + pre + '" class="rt" inputmode="numeric" maxlength="3" value="' + esc(nums[i] || '') + '"' + (custom ? '' : ' readonly') + ' aria-label="' + esc(tr('ratioPh')) + ' ' + (i + 1) + '">').join('/') + '</span>' +
    (noSet ? '' : '<button class="mini alt" data-a="rpset" data-act="rpset" data-p="' + pre + '"' + (custom ? '' : ' hidden') + '>' + tr('rpSetBtn') + '</button>') + '</span>';
}
const byId = (root, id) => root.querySelector('[id="' + id + '"]');
function readPick(root, pre){
  const s = byId(root, pre + 's'); if (!s) return null;
  if (s.value !== 'c'){ const p = presets()[+s.value]; return p ? p.n + '|' + p.r : null; }
  const r = parseRatio(byId(root, pre + '0').value, byId(root, pre + '1').value, byId(root, pre + '2').value);
  return r ? tr('rpCustom') + '|' + r : null;
}
function applyPick(pre, root){
  const r = readPick(root, pre); if (!r) return note(tr('ratioErr'));
  const t = Math.round(now());
  if (pre === 'sr'){ setMe({ ratio: r }); return; }
  if (pre === 'lr'){ setMe({ lr: { r: r, at: t } }); note(tr('rpSet', { r: fmtR(r) })); return; }
  if (!hasControl()) return;
  try { localStorage.setItem('tacsync_ratio', r); } catch (x) {}
  const T = mgT();
  if (pre === 'gr') return upd({ ['tg.' + T + '.grp.ratio']: r, ['tg.' + T + '.grp.rAt']: t });
  if (pre === 'dr') return upd({ ['tg.' + T + '.dr']: r });
  if (pre.indexOf('ov_') === 0) return upd({ ['tg.' + T + '.grp.rOv.' + pre.slice(3)]: { r: r, at: t } });
}
/* wiring, for the box (also inside the pop-out) and the admin panel */
function wirePick(el){
  el.addEventListener('change', e => {
    const pre = e.target.dataset && e.target.dataset.rp; if (!pre) return;
    const root = e.target.closest('.rpick'), c = e.target.value === 'c', P = presets()[+e.target.value];
    root.querySelectorAll('input.rt').forEach((i, k) => { i.readOnly = !c; if (!c && P) i.value = P.r.split('/')[k] || ''; });
    const sb = root.querySelector('[data-a="rpset"]'); if (sb) sb.hidden = !c;
    if (!c) applyPick(pre, root); else root.querySelector('input.rt').focus();
  });
  const toCustom = e => {
    const i = e.target; if (!(i.dataset && i.dataset.rq) || !i.readOnly || i.disabled) return;
    const root = i.closest('.rpick'), s = byId(root, i.dataset.rq + 's'); if (!s) return;
    s.value = 'c'; root.querySelectorAll('input.rt').forEach(x => { x.readOnly = false; });
    const sb = root.querySelector('[data-a="rpset"]'); if (sb) sb.hidden = false;
  };
  el.addEventListener('pointerdown', toCustom); el.addEventListener('focusin', toCustom);
  el.addEventListener('input', e => {
    const pre = e.target.dataset && e.target.dataset.rq; if (!pre || e.target.id === pre + '2') return;
    const root = e.target.closest('.rpick'), a = byId(root, pre + '0'), b = byId(root, pre + '1'), c = byId(root, pre + '2');
    if (a.value !== '' && b.value !== ''){ const r = 100 - (parseInt(a.value, 10) || 0) - (parseInt(b.value, 10) || 0); if (r >= 0) c.value = r; }
  });
}
const nudges = who => '<span class="adj">' + [-1, -0.1, 0.1, 1].map(d => '<button class="alt mini" data-act="nudge" data-d="' + d + '">' + (d > 0 ? '+' : '−') + Math.abs(d).toString().replace('0.', '.') + '</button>').join('') + '</span>';

/* The common part of a running rally: gather, march, verify. For the lead and for joiners. */
function rallyView(rt, t, opts){
  const T = rt.T, ph = rallyPhase(rt, t), troops = opts.ratio ? tr('troops', { r: fmtR(opts.ratio) }) : '', sym = esc(opts.sym), id = rt.uid + ':' + rt.S;
  const lead = !!opts.lead, ctl = sync => lead ? (sync ? '<input id="inSync" class="wide" style="width:70px" inputmode="numeric" placeholder="' + esc(tr('gatherPh')) + '">' + btn('gsync', tr('syncGather')) : '') + (rt.synced ? nudges() : '') : '';
  const cx = lead && rt.mode === 'solo' ? btn('scancel', tr('cancelRally'), 'rd mini') : '';
  if (ph === 'gather') return V('rg:' + id + rt.synced + lead, { cid: 'G' + id, cls: 'run', label: tr(rt.synced ? 'gathering' : 'gatheringEst', { t: tn(T), s: sym }), time: fmtCount(rt.G - t), sub: troops, ctrl: ctl(true) + cx });
  if (ph === 'march'){
    cue('RF' + id, 600, 200, tr('say_reinforce'), [100], 'rf');
    return V('rm:' + id + rt.synced + lead, { cid: 'M' + id, cls: rt.land - t < 3000 ? 'warn' : 'run', label: tn(T) + ' · ' + tr('prepReinforce'), time: fmtCount(rt.land - t), sub: sym + (troops ? ' · ' + troops : ''), ctrl: ctl(false) + cx });
  }
  if (ph === 'verify'){
    cue('VF' + id, 520, 200, tr('say_verify'), [100], 'vf');
    const solo = lead && rt.mode === 'solo';
    return V('rv:' + id + solo, { cls: 'idle', label: tn(T) + ' · ' + sym, time: tr('verifying'), sub: troops,
      ctrl: solo ? btn('win', tr('winBtn'), 'go') + btn('lose', tr('failBtn'), 'rd') : '' });
  }
  return null;
}

function leadView(t){
  const T = prof.tgt, S = esc(prof.sym || '');
  if (!prof.sym || ui.editSym)
    return V('lsym:' + ui.editSym + lang, { label: tr('symEntry', { t: tn(T) }), ctrl:
      '<input id="inSym" maxlength="2" autocapitalize="characters" placeholder="VX" value="' + S + '" aria-label="' + esc(tr('leadEntry')) + '">' + btn('sym-ok', tr('ok')) + btn('back', tr('back'), 'alt') + '<span class="err" id="inErr"></span>' });
  if (ui.soloQ && prof.mode !== 'solo')
    return V('lsoloq:' + lang, { cls: 'warn', label: tn(T) + ' · ' + S, time: tr('soloQ'), sub: tr('soloQSub'), ctrl: btn('mode', tr('soloYes'), 'go', 'data-m="solo"') + btn('soloNo', tr('soloNo'), 'alt') });
  const rt = rallyOf(pid), ratio = ratioOf(pid);
  if (prof.won && rt && prof.won.S === rt.S) return V('lwon', { cls: 'go', label: tn(T) + ' · ' + S, time: tr('winBtn'), sub: tr('youDef', { t: tn(T) }) });
  if (rt && rallyPhase(rt, t) !== 'pre' && !resOf(rt)){
    if (prof.mode !== 'solo' && t < rt.S + 1500 && t >= rt.S) return V('send', { cid: 'L' + rt.S, cls: 'go', label: tn(T) + ' · ' + S, time: tr('send'), sub: ratio ? tr('troops', { r: fmtR(ratio) }) : '', go: true, say: tr('say_send'), clip: 'cs' });
    const rv = rallyView(rt, t, { lead: true, sym: prof.sym, ratio: ratio }); if (rv) return rv;
  }
  const unreg = btn('unreg', tr('unregister'), 'alt'), back = btn('soloAsk', tr('soloBtn'), 'alt') + unreg;
  if (prof.mode === 'solo'){
    return V('lsolo:' + lang, { label: tr('soloRatio', { t: tn(T), s: S }), ctrl: ratioPick('sr', prof.ratio, true) + btn('solo-start', tr('startBtn'), 'go') + btn('mode0', tr('backGroup'), 'alt') + unreg + '<span class="err" id="inErr"></span>' });
  }
  /* group */
  const g = grpOf(T), troops = ratio ? tr('troops', { r: fmtR(ratio) }) : '';
  const myR = '<span class="ln" style="width:100%"><span class="mut">' + tr('myRatio') + '</span>' + ratioPick('lr', ratio) + '</span>';
  const picked = !!(g.sel || {})[pid], inPlan = g.stage === 'countdown' && g.plan && g.plan.launch && g.plan.launch[pid] != null;
  if (!picked && !inPlan) return V('lga:' + lang + ratio, { label: tn(T) + ' · ' + S + ' · ' + tr('grpAvail'), time: tr('wait'), sub: fmtMS(prof.mar[T]) + ' · ' + tr('grpAvailSub') + (troops ? ' · ' + troops : ''), ctrl: myR + back });
  if (g.stage === 'lobby') return V('lgp:' + lang + ratio, { label: tn(T) + ' · ' + S + ' · ' + tr('grpPicked'), time: tr('standby'), sub: fmtMS(prof.mar[T]) + (troops ? ' · ' + troops : ''), ctrl: myR + back });
  if (g.stage === 'ready'){
    if (!(prof.readyAt > g.rcAt)) return V('lgready:' + g.rcAt + lang + ratio, { cls: 'warn', label: tn(T) + ' · ' + tr('readyCheck'), sub: troops, ctrl: btn('ready', tr('ready'), 'go big') + myR, rc: g.rcAt });
    return V('lgrd', { label: tr('readyDone'), time: tr('wait'), sub: tr('waitOthers') });
  }
  if (g.stage === 'countdown'){
    if (!g.plan || !g.plan.launch || g.plan.launch[pid] == null) return V('lgmiss', { label: tr('notInOp'), time: tr('missed'), sub: tr('waitNext'), ctrl: back });
    if (t < g.cdEnd) return V('cd', { cid: 'C' + g.cdEnd, cls: 'run', label: tr('cdLabel'), time: String(Math.ceil((g.cdEnd - t) / 1000)), rem: g.cdEnd - t, sub: troops });
    const L = g.plan.launch[pid], rem = L - t;
    if (rem > 0) return V('run', { cid: 'L' + L, cls: rem < 3000 ? 'warn' : 'run', label: tr('launchIn', { sym: tn(T) + ' · ' + S }), time: fmtCount(rem), rem: rem, sub: troops });
  }
  return V('lgx:' + g.stage, { label: tn(T) + ' · ' + S, time: tr('standby'), sub: troops, ctrl: back });
}

function joinView(t){
  const T = prof.tgt;
  const lead = prof.rally ? pdoc(prof.rally) : null;
  const ok = lead && lead.role === 'lead' && lead.target === T && lead.sym;
  if (prof.rally && !ok && lead && lead.won && now() - lead.won.at < 120000) return V('jwon', { cls: 'go', label: tn(T), time: tr('winBtn'), sub: tr('youDef', { t: tn(T) }) });
  /* the lead left, changed target or role: the rally is gone, and the joiner picks again */
  if (prof.rally && !ok){ ui.disbandAt = Date.now(); cue('DB' + prof.rally + ui.disbandAt, 440, 300, tr('say_disband'), [200], 'db'); setMe({ rally: null }); }
  if (ui.disbandAt && Date.now() - ui.disbandAt < 10000) return V('jdb', { cls: 'warn', label: tn(T), time: tr('disbanded'), sub: tr('pickAgain'), ctrl: btn('jdbok', tr('ok'), 'alt') });
  ui.disbandAt = 0;
  if (!prof.rally){
    const Ls = leadsOn(T);
    if (!Ls.length) return V('jnone:' + lang, { label: tr('pickLead', { t: tn(T) }), sub: tr('noLeadsHere', { t: tn(T) }), ctrl: btn('back', tr('back'), 'alt') });
    return V('jpick:' + lang + Ls.map(l => l.uid + l.sym + rallyCls(l.uid, t)).join(','), { label: tr('pickLead', { t: tn(T) }), ctrl:
      Ls.map(l => btn('pick', '<b>' + esc(l.sym) + '</b> ' + esc(l.name || ''), rallyCls(l.uid, t), 'data-u="' + l.uid + '"')).join('') + btn('back', tr('back'), 'alt') });
  }
  const sym = esc(lead.sym), rt = rallyOf(prof.rally), ratio = ratioOf(prof.rally), troops = ratio ? tr('troops', { r: fmtR(ratio) }) : '';
  if (rt && !resOf(rt)){
    const ph = rallyPhase(rt, t);
    if (ph === 'gather') return V('jgo', { cid: 'J' + rt.S, cls: 'go', label: tn(T) + ' · ' + sym + ' · ' + tr('joinNow'), time: fmtCount(rt.G - t), sub: (rt.synced ? '' : tr('estTag') + ' · ') + (troops || tr('rallyStarted')), go: true, say: tr('say_join'), clip: 'cj' });
    if (ph !== 'pre'){ const rv = rallyView(rt, t, { lead: false, sym: lead.sym, ratio: ratio }); if (rv) return rv; }
  }
  if (lead.cx && now() - lead.cx.at < 10000 && !rt){
    cue('CX' + lead.cx.at, 440, 300, tr('say_cancelled'), [200], null);
    return V('jcx', { cls: 'warn', label: tn(T) + ' · ' + sym, time: tr('rallyCancelled'), sub: tr('cancelledSub') });
  }
  const g = grpOf(T), inG = lead.mode !== 'solo' && !!(g.sel || {})[prof.rally], cd = inG && g.stage === 'countdown' && t < g.cdEnd && g.plan && g.plan.launch && g.plan.launch[prof.rally] != null;
  if (cd) return V('jcd', { cid: 'C' + g.cdEnd, cls: 'run', label: tr('joiningSym', { t: tn(T), s: sym }), time: String(Math.ceil((g.cdEnd - t) / 1000)), sub: tr('cdSub'), rem: g.cdEnd - t });
  const st = inG && g.stage === 'ready' ? tr('readyQ') : tr('standby');
  return V('jw:' + lang, { label: tr('joiningSym', { t: tn(T), s: sym }), time: st, sub: troops || (lead.mode === 'solo' ? tr('soloTag') : tr('groupTag')), ctrl: btn('jchange', tr('changeBtn'), 'alt') });
}

function defView(t){
  const T = prof.tgt, mar = prof.mar[T], dRat = TG(T).dr ? ' · ' + tr('troops', { r: fmtR(TG(T).dr) }) : '';
  const list = launchList(wavesOf(T).filter(w => !w.ctr), mar), st = defState(list, t);
  /* Too late for a normal send (an Already marching sync shorter than this player's march, or opened late):
     the only chance is to send now and speed up, so say so instead of "all sent". Earliest landing first. */
  const late = list.filter(it => t > it.L + 1500 && t < it.landAt).sort((a, b) => a.landAt - b.landAt)[0];
  if (late && !(st.kind === 'send') && !(st.kind === 'count' && st.rem < 5000)){
    const left = late.landAt - t, short = Math.max(0, mar * 1000 - left);
    cue('LT' + late.id + ':' + Math.round(late.landAt), 990, 450, tr('say_late'), [300, 100, 300, 100, 300], null);
    return V('dl:' + late.id + lang, { cid: 'DL' + late.id, cls: 'warn flash', label: tn(T) + ' · ' + late.label + ' · ' + tr('lateHdr'), time: fmtCount(left),
      sub: tr('lateSub', { m: fmtMS(mar), l: fmtMS(left / 1000), s: fmtMS(short / 1000) }) + dRat });
  }
  if (st.kind === 'count'){
    const it = st.item, nx = st.nextGap != null ? tr('thenGap', { s: st.nextGap.toFixed(1) }) : '';
    /* an enemy's march to this target is a 30 s guess until the admin confirms it live */
    const w = wavesOf(T).find(x => x.id === it.id), unsure = w && w.rallyEnd && w.mc === false;
    return V('dc', { cid: 'D' + it.id + ':' + Math.round(it.L), cls: (it.urgent || (st.nextGap != null && st.nextGap <= 1) || st.rem < 3000) ? 'warn' : 'run', label: tn(T) + ' · ' + tr('sendIn', { l: it.label }), time: fmtCount(st.rem), sub: (unsure ? tr('marNotOk') : esc(it.name) + nx) + dRat, cnt: st.left, rem: st.rem });
  }
  if (st.kind === 'send'){
    const it = st.item;
    return V('ds', { cid: 'D' + it.id + ':' + Math.round(it.L), cls: 'go', label: tn(T) + ' · ' + it.label, time: tr('send'), sub: dRat.slice(3), cnt: st.left, go: true, say: tr('say_send'), clip: 'cs' });
  }
  const ra = prof.fromWin === T ? btn('reatk', tr('backAtk'), 'alt') : '';
  if (st.kind === 'done') return V('ddone:' + !!ra, { label: tr('allSent'), time: tr('DONE'), sub: tr('checkRatios') + dRat, cls: 'idle', ctrl: ra });
  return V('didle:' + !!ra + lang, { label: tr('defending', { t: tn(T) }), time: tr('standby'), sub: (ra ? tr('notDefQ') + ' · ' : '') + (wavesOf(T).length ? tr('marchSub', { t: fmtMS(mar) }) : tr('noIncoming')) + dRat, ctrl: ra });
}

function viewNow(){
  if (!D) return V('conn', { label: live ? '' : tr('connecting'), time: '…' });
  if (!profileDone()) return V('prof:' + lang, { label: tr('profHdr'), time: '…', sub: tr('nameReq') });
  const t = now();
  if (ui.pickT === 'C' && inDef('C')) return V('pickC:' + lang, { label: tr('chooseAct', { t: tn('C') }), sub: tr('ctrPickSub'), ctrl:
    btn('role-def', tr('defendBtn')) + btn('role-ctr', tr('ctrRole'), 'alt') + btn('pickx', tr('back'), 'alt') });
  if (ui.pickT) return V('pick:' + ui.pickT + lang, { label: tr('chooseAct', { t: tn(ui.pickT) }), ctrl:
    btn('role-lead', tr('lead')) + btn('role-join', tr('join'), 'alt') + btn('role-def', tr('defendAnyway'), 'alt') + btn('pickx', tr('back'), 'alt') });
  if (isTdl()) return tdlView(t);
  if (!prof.tgt || !prof.role) return V('notgt:' + lang, { label: tr('pickTarget'), time: '…' });
  if (prof.role === 'lead') return leadView(t);
  if (prof.role === 'join') return joinView(t);
  if (prof.role === 'counter') return ctrView(t);
  return defView(t);
}


/* ---------- canvas for the phone pop-out ---------- */
const cv = $('cv'), g = cv.getContext('2d'), vid = $('vid');
const colors = { idle: '#141b27', run: '#141b27', warn: '#2a1215', go: '#22c55e' };
function plain(s){ return String(s).replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'"); }
function fitFont(txt, size, weight, maxW){
  let s = size;
  g.font = weight + ' ' + Math.round(s) + 'px system-ui,sans-serif';
  while (s > 9 && g.measureText(txt).width > maxW){ s -= 1; g.font = weight + ' ' + Math.round(s) + 'px system-ui,sans-serif'; }
}
function draw(v){
  const w = cv.width, h = cv.height;
  try { g.direction = lang === 'ar' ? 'rtl' : 'ltr'; } catch (e) {}
  g.fillStyle = colors[v.cls] || colors.idle; g.fillRect(0, 0, w, h);
  g.strokeStyle = v.cls === 'warn' ? '#ef4444' : v.cls === 'go' ? '#22c55e' : CV.bd;
  g.lineWidth = h * 0.04; g.strokeRect(h * 0.02, h * 0.02, w - h * 0.04, h - h * 0.04);
  g.textAlign = 'center';
  const dark = v.cls === 'go', mw = w * 0.84;
  g.fillStyle = dark ? '#04210f' : CV.mu;
  if (v.msg){
    g.fillStyle = CV.am; g.fillRect(h * 0.04, h * 0.04, w - h * 0.08, h * 0.26);
    g.fillStyle = '#1a1300'; fitFont(v.msg, h * 0.16, 800, w * 0.88); g.fillText(v.msg, w / 2, h * 0.225);
  } else {
    const lb = plain(v.label); fitFont(lb, h * 0.13, 700, mw * 0.8); g.fillText(lb, w / 2, h * 0.22);
  }
  g.fillStyle = dark ? '#04210f' : v.cls === 'warn' ? '#ff6b6b' : v.cls === 'run' ? CV.am : CV.tx;
  const tx = plain(v.time); fitFont(tx, h * 0.4, 800, mw); g.fillText(tx, w / 2, h * 0.64);
  g.fillStyle = dark ? '#04210f' : CV.mu;
  const sb = plain(v.sub); fitFont(sb, h * 0.11, 600, mw); g.fillText(sb, w / 2, h * 0.88);
  if (v.cnt != null && !v.msg){
    g.textAlign = 'right'; g.fillStyle = dark ? '#04210f' : CV.tx;
    g.font = '800 ' + Math.round(h * 0.15) + 'px system-ui,sans-serif'; g.fillText(String(v.cnt), w - h * 0.08, h * 0.2);
  }
}

/* ---------- main tick ---------- */
let ctrlView = null;
function tick(){
  processResults(); if (D && pid) tdlWatch();
  const v = viewNow();
  box.className = 'box ' + v.cls;
  lab.innerHTML = v.label; tim.innerHTML = v.time; tim.className = 't' + (plain(v.time).length > 8 ? ' sm' : ''); sub.innerHTML = v.sub;
  if (v.cnt != null){ cntEl.hidden = false; cntEl.textContent = v.cnt; } else cntEl.hidden = true;
  /* In the pop-out and the compact view the lead's own card is out of sight, so Request help rides in the box. */
  const hx = prof.role === 'lead' && (popped || compact) ? (prof.helpReq ? '<button class="rd" data-act="help">' + tr('helpCancel') + '</button>' : '<button class="alt" data-act="help">' + tr('helpReqBtn') + '</button>') : '';
  const ck = v.key + '|' + hx;
  if (ck !== lastKey){
    const keep = v.key === ctrlView ? Array.from(ctrl.querySelectorAll('input[id],select[id]')).map(i => [i.id, i.value, i.readOnly]) : [];
    ctrl.innerHTML = v.ctrl + hx; lastKey = ck; ctrlView = v.key;
    keep.forEach(([id, val, ro]) => { const i = byId(ctrl, id); if (i && val){ i.value = val; if (i.tagName === 'INPUT') i.readOnly = ro; } }); /* typed values survive the help button changing */
    if (popped) fitPop();
  }
  if (v.rem != null){ const s = Math.ceil(v.rem / 1000); if (s >= 1 && s <= 3) cue(v.cid + ':' + s, 660, 120, String(s), [60], 'c' + s); }
  if (v.go) cue(v.cid + ':go', 990, 400, v.say || tr('say_send'), [150, 60, 150], v.clip);
  if (v.rc) cue('RC' + v.rc + ':' + Math.floor(Math.max(0, now() - v.rc) / 10000), 700, 220, tr('say_ready'), [120, 60, 120], 'rc');
  v.msg = msgTick();
  draw(v);
  renderMap(); tickMe(); tickAdmin();
}
const worker = new Worker(URL.createObjectURL(new Blob(['setInterval(()=>postMessage(0),100)'])));
worker.onmessage = tick;
const invalidate = () => { lastKey = null; };

/* ---------- page parts added by this version: profile, map ---------- */
const s2Style = document.createElement('style');
s2Style.textContent =
  '#prof .grid{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin:6px 0}#prof .grid label{display:flex;flex-direction:column;align-items:center;font-size:11px;color:var(--mu);gap:3px}' +
  '#prof .grid input{width:100%;min-width:0}#prof #pfName{text-transform:none;width:100%;max-width:220px;text-align:start}' +
  '#map{direction:ltr;display:grid;grid-template-columns:repeat(3,1fr);grid-template-areas:". n ." "w c e" ". s .";gap:6px;margin:6px 0}' +
  '.tile{min-height:56px;padding:5px 4px;display:flex;flex-direction:column;align-items:center;gap:3px;background:var(--pan);color:var(--tx);border:2px solid var(--bd);border-radius:10px;font-weight:800;font-size:13px}' +
  '.tile.sel{border-color:var(--am);box-shadow:0 0 0 2px rgba(245,179,1,.35)}.tile.def{background:#13242a}.tile .bdg{font-size:10px;background:#1f6f8b;color:#e6f7ff;border-radius:6px;padding:0 5px}' +
  '.tile .ld{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}.tile .ld span{font-size:14px;font-weight:900;border-radius:6px;padding:2px 7px;letter-spacing:.5px}' +
  '.rg{background:var(--gr)!important;color:#04210f!important}.rr{background:var(--rd)!important;color:#fff!important}' +
  '.ry{background:#f5b301!important;color:#241a00!important;animation:rfl .5s steps(2,start) infinite}.rf{background:var(--rd)!important;color:#fff!important;animation:rfl .25s steps(2,start) infinite}' +
  '@keyframes rfl{to{opacity:.25}}[hidden]{display:none!important}' +
  '.tile.hl{border-color:var(--gr);box-shadow:0 0 0 3px rgba(40,200,110,.45)}.tile.mine{border-color:#ff4d4d;box-shadow:0 0 0 3px rgba(255,77,77,.45)}.tile .you{font-size:10px;background:var(--tx);color:var(--bg);border-radius:6px;padding:0 5px;font-weight:900}' +
  '.box.flash{animation:lfl .45s steps(2,start) infinite}@keyframes lfl{to{background:#5a0f0f;border-color:#ff4d4d}}.rt[readonly]{opacity:.75;cursor:pointer}' +
  '.rpick{display:inline-flex;align-items:center;gap:4px;flex-wrap:wrap}.rpick select{max-width:170px}.ratio{display:inline-flex;align-items:center;gap:2px}.rt{width:42px;padding:6px 2px}#ctrl .adj button{min-height:30px}' +
  '.tbar button{flex:1;min-width:0;padding:6px 2px;font-size:12px}.tbar button.def{outline:2px solid #1f6f8b}';
document.head.append(s2Style);
const profSec = document.createElement('section'); profSec.id = 'prof'; profSec.className = 'card'; profSec.hidden = true;
const mapSec = document.createElement('section'); mapSec.id = 'mapSec';
$('boxSlot').before(profSec); $('boxSlot').before(mapSec);

function renderProfile(force){
  const show = !profileDone() || ui.editProf;
  if (profSec.hidden === show || force){
    profSec.hidden = !show;
    if (show) profSec.innerHTML = '<div class="h">' + tr('profHdr') + '</div>' +
      '<input id="pfName" dir="auto" maxlength="12" placeholder="' + esc(tr('namePh2')) + '" aria-label="' + esc(tr('namePh2')) + '" value="' + esc(prof.name || '') + '">' +
      '<div class="mut" style="margin-top:8px">' + tr('marHdr') + '</div><div class="grid">' +
      TARGETS.map(T => '<label>' + tn(T) + '<input id="pf' + T + '" inputmode="numeric" placeholder="0:45" value="' + (prof.mar[T] ? fmtMS(prof.mar[T]) : '') + '"></label>').join('') +
      '</div><div class="row tight"><button id="pfSave">' + tr('saveProf') + '</button>' + (profileDone() ? '<button class="alt" id="pfCancel">' + tr('back') + '</button>' : '') + '</div><div class="err" id="pfErr"></div>';
  }
  mapSec.hidden = !profileDone();
}
profSec.addEventListener('click', e => {
  if (e.target.id === 'pfCancel'){ ui.editProf = false; renderProfile(true); return; }
  if (e.target.id !== 'pfSave') return;
  const name = $('pfName').value.trim().slice(0, 12), mar = {};
  if (!name){ $('pfErr').textContent = tr('nameReq'); return; }
  for (const T of TARGETS){ const m = parseMS($('pf' + T).value); if (!m || m < 1){ $('pfErr').textContent = tr('marReq'); return; } mar[T] = m; }
  ui.editProf = false; setMe({ name: name, mar: mar }); note(tr('profSaved')); renderProfile(true); tick();
});

let mapHtml = '';
/* Rally colour on the map and in the joiner's list: green = not marching yet, flashing yellow = march starts within 20 s,
   flashing red = within 5 s, red = marching. Joiners may join at any stage (they may have joined in game first). */
function rallyCls(u, t){
  const rt = rallyOf(u); if (!rt || resOf(rt)) return 'rg';
  const ph = rallyPhase(rt, t); if (ph === 'march' || ph === 'verify') return 'rr';
  const left = rt.G - t; return left <= 5000 ? 'rf' : left <= 20000 ? 'ry' : 'rg';
}
function renderMap(){
  if (!profileDone() || !D){ if (mapHtml){ mapSec.innerHTML = ''; mapHtml = ''; } return; }
  const t = now(), h = '<div class="h">' + tr('mapHdr') + '</div><div id="map">' + TARGETS.map(T => {
    const ls = leadsOn(T), sel = ui.pickT === T, you = prof.tgt === T && !!prof.role, tt = tdlTile(T, t);
    return '<button class="tile' + (sel ? ' sel' : '') + (inDef(T) ? ' def' : '') + tt.cls + '" style="grid-area:' + T.toLowerCase() + '" data-t="' + T + '">' +
      '<span>' + tn(T) + '</span>' + (you ? '<span class="you">' + tr('youTag') + '</span>' : '') + tt.h + (inDef(T) ? '<span class="bdg">' + tr('defBadge') + '</span>' : '') +
      '<span class="ld">' + ls.map(l => '<span class="' + rallyCls(l.uid, t) + '">' + esc(l.sym) + '</span>').join('') + '</span></button>';
  }).join('') + '</div>';
  if (h !== mapHtml){ mapHtml = h; mapSec.innerHTML = h; }
}
mapSec.addEventListener('click', e => {
  const b = e.target.closest('[data-t]'); if (!b) return;
  const T = b.dataset.t;
  if (inDef(T) && T === 'C' && !(prof.tgt === 'C' && prof.role)){ ui.pickT = 'C'; invalidate(); tick(); return; }
  if (inDef(T)){ if (!(prof.tgt === T && prof.role === 'def')) assign(T, 'def'); return; }
  if (prof.tgt === T && prof.role){ ui.pickT = null; invalidate(); tick(); return; }
  ui.pickT = T; invalidate(); tick();
});

/* ---------- player actions in the overlay box ---------- */
box.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b || !D) return;
  const act = b.dataset.act, root = b.closest('#box') || box, q = s => root.querySelector(s);
  const err = m => { const x = q('#inErr'); if (x) x.textContent = m; };
  const t = now();
  if (act === 'role-lead'){ assign(ui.pickT, 'lead'); }
  else if (act === 'role-join'){ assign(ui.pickT, 'join'); }
  else if (act === 'role-def'){ assign(ui.pickT, 'def'); }
  else if (act === 'role-ctr'){ becomeCounter(); return; }
  else if (act === 'pickx'){ ui.pickT = null; }
  else if (act === 'back'){ ui.editSym = false; setMe({ role: null, tgt: null }); }
  else if (act === 'sym-ok'){
    const sym = q('#inSym').value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (sym.length !== 2) return err(tr('symErr'));
    let taken = false; (isAdmin ? PL : LEADS).forEach((p, u) => { if (u !== pid && p.role === 'lead' && p.sym === sym && fresh(p)) taken = true; });
    if (taken) return err(tr('symTaken'));
    ui.editSym = false; setMe(prof.mode ? { sym: sym } : { sym: sym, mode: 'group', readyAt: 0 });
  }
  else if (act === 'mode'){ ui.soloQ = false; setMe({ mode: b.dataset.m, readyAt: 0, solo: null, gs: null, mo: null }); }
  else if (act === 'reatk'){ setMe({ tgt: null, role: null, mode: null, rally: null, solo: null, gs: null, mo: null, won: null, readyAt: 0, fromWin: null }); note(tr('pickAtk')); }
  else if (act === 'soloAsk'){ ui.soloQ = true; invalidate(); tick(); }
  else if (act === 'soloNo'){ ui.soloQ = false; invalidate(); tick(); }
  else if (act === 'mode0'){ setMe({ mode: 'group', readyAt: 0, solo: null, gs: null, mo: null }); }
  else if (act === 'unreg'){ setMe({ role: null, tgt: null, mode: null, solo: null, gs: null, mo: null }); }
  else if (act === 'ready'){ setMe({ readyAt: Math.round(t) }); }
  else if (act === 'solo-start'){
    const r = readPick(b.closest('#box') || box, 'sr');
    if (!r) return err(tr('ratioErr'));
    try { localStorage.setItem('tacsync_ratio', r); } catch (x) {}
    setMe({ ratio: r, solo: { start: Math.round(t), ratio: r }, gs: null, mo: null });
  }
  else if (act === 'gsync'){
    const s = parseMS(q('#inSync').value); if (s == null) return;
    setMe({ gs: { g: Math.round(t + s * 1000), at: Math.round(t) } }); note(tr('syncedOk'));
  }
  else if (act === 'nudge'){ leadNudge(parseFloat(b.dataset.d)); }
  else if (act === 'win' || act === 'lose'){
    const rt = rallyOf(pid); if (!rt) return;
    /* a solo lead reports the result in their own document; joiners and the admin read it from there */
    if (isCtr()){ setMe(act === 'win' ? { solo: null, gs: null, mo: null, cwon: Math.round(now()) } : { solo: null, gs: null, mo: null, t: Math.round(now()) }); }
    else if (act === 'win'){ soloWin(rt); } else setMe({ solo: null, gs: null, mo: null });
  }
  else if (act === 'help'){ toggleHelp(); return; }
  else if (ctrAct(act, b, t)) return;
  else if (tdlAct(act, b)) return;
  else if (act === 'scancel'){ if (!confirm(tr('cancelQ'))) return; setMe({ solo: null, gs: null, mo: null, cx: { at: Math.round(t) } }); }
  else if (act === 'rpset'){ applyPick(b.dataset.p, b.closest('.rpick')); return; }
  else if (act === 'pick'){ setMe({ rally: b.dataset.u }); }
  else if (act === 'jchange'){ setMe({ rally: null }); }
  else if (act === 'jdbok'){ ui.disbandAt = 0; }
  invalidate(); tick();
});
wirePick(box);
/* After a sync, a nudge refines the gather timer while gathering and the march once marching.
   A march correction is saved as this lead's default march for the target. */
function leadNudge(d){
  const rt = rallyOf(pid); if (!rt || !rt.synced) return;
  const t = now(), ph = rallyPhase(rt, t);
  if (ph === 'gather') setMe({ gs: { g: Math.round(rt.G + d * 1000), at: Math.round(t) } });
  else if (ph === 'march'){
    const m = Math.max(1, Math.round((rt.M + d) * 10) / 10), mar = Object.assign({}, prof.mar); mar[prof.tgt] = m;
    setMe({ mo: { m: m, at: Math.round(t) }, mar: mar });
  }
}
function toDefense(T, key, won){
  /* Usually only one rally of the attack ends up garrisoned, so everyone is moved to defense and offered a way back to attack. */
  setMe({ tgt: T, role: 'def', mode: null, solo: null, gs: null, mo: null, rally: null, won: won || null, readyAt: 0, fromWin: T });
  cue('DF' + key, 520, 250, tr('say_defense'), [200], 'df'); localMsg(tr('youDefNote', { t: tn(T) }));
}
/* A solo lead marks the win and moves to defense at once. The win stays on the lead's document,
   where the joiners (who follow their lead's document) and the admin see it. */
function soloWin(rt){ toDefense(rt.T, 'W' + rt.S, { S: rt.S, at: Math.round(now()) }); }
/* Act on results: the admin's Attack successful / not successful, or a solo lead's win.
   The admin's result is kept per lead in the room; it counts if it is recent and newer than this player's assignment. */
function recentRes(T, u){
  const r = ((TG(T).res || {})[u]);
  return r && now() - r.at < 120000 && r.at >= (prof.t || 0) - 1000 ? r : null;
}
function processResults(){
  if (!D || !prof.tgt) return;
  if (prof.role === 'lead'){
    const r = recentRes(prof.tgt, pid); if (!r) return;
    const key = 'L' + pid + ':' + r.at; if (handledRes.has(key)) return; handledRes.add(key);
    if (r.kind === 'win') toDefense(prof.tgt, key);
    else if (prof.mode === 'solo') setMe({ solo: null, gs: null, mo: null });
  } else if (prof.role === 'join' && prof.rally){
    const lead = pdoc(prof.rally), r = recentRes(prof.tgt, prof.rally);
    const won = (r && r.kind === 'win') || (lead && lead.won && now() - lead.won.at < 120000 && lead.won.at >= (prof.t || 0) - 1000);
    if (!won) return;
    const key = 'J' + prof.rally + ':' + (r ? r.at : lead.won.at); if (handledRes.has(key)) return; handledRes.add(key);
    toDefense(prof.tgt, key);
  }
}

/* ---------- my card ---------- */
let meHtml = '';
function tickMe(){
  const T = prof.tgt;
  const r = !T || !prof.role ? null : prof.role === 'lead' ? tr('roleLeadSym', { s: prof.sym || '…' }) : prof.role === 'join' ? tr('roleJoinOf', { s: (pdoc(prof.rally) || {}).sym || '…' }) : prof.role === 'counter' ? tr('ctrRole') : prof.role === 'tdl' ? tr('roleTdl') : tr('roleDef');
  $('meInfo').textContent = (r ? tr('meLine', { n: prof.name || '?', t: tn(T), r: r }) : tr('meNone', { n: prof.name || '?' })) + (isAdmin ? tr('adminSuffix') : '');
  const mt = T || ui.pickT || 'C';
  $('meMar').textContent = fmtMS(prof.mar[mt]);
  $('meLbl').textContent = tr('marchTarget') + ' · ' + tn(mt);
  let h = '';
  let hb = '';
  if (prof.role === 'lead' && prof.sym){
    const J = joinersOf(pid); h = J.length ? tr('joinedList', { n: J.map(j => esc(j.name || '?')).join(', ') }) : tr('nobodyJoined');
    hb = prof.helpReq ? '<button class="mini rd" data-me="help">' + tr('helpCancel') + '</button><span class="mut">' + (helpBy ? tr('helpByLbl', { n: esc(helpBy.name || '?') }) : tr('helpWaiting')) + '</span>'
      : '<button class="mini" data-me="help">' + tr('helpReqBtn') + '</button>';
  }
  if (prof.role === 'lead' || prof.helps) h += (h ? ' · ' : '') + tr('helpCount', { n: prof.helps || 0 });
  h = '<div class="mut">' + h + '</div><div class="row tight">' + hb + '<button class="alt mini" data-me="prof">' + tr('editProf') + '</button></div>';
  if (h !== meHtml){ meHtml = h; let x = $('meExtra'); if (!x){ x = document.createElement('div'); x.id = 'meExtra'; $('resetMe').before(x); } x.innerHTML = h; }
}
function toggleHelp(){
  if (prof.helpReq){ setMe({ helpReq: 0 }).then(() => clearHelpBy()); } else setMe({ helpReq: Math.round(now()), helps: (prof.helps || 0) + 1 });
  tick();
}
$('me').addEventListener('click', e => {
  if (e.target.closest('[data-me="help"]')){ toggleHelp(); return; }
  if (e.target.closest('[data-me="prof"]')){ ui.editProf = true; renderProfile(true); profSec.scrollIntoView({ block: 'nearest' }); return; }
  const b = e.target.closest('[data-n]'); if (!b) return;
  const mt = prof.tgt || ui.pickT || 'C', cur = prof.mar[mt]; if (!cur) return note(tr('noteMarchFirst'));
  const mar = Object.assign({}, prof.mar); mar[mt] = Math.max(1, Math.round((cur + parseFloat(b.dataset.n)) * 10) / 10);
  setMe({ mar: mar }); tick();
});
/* A question bar at the top of the page with two answers. */
function askBar(text, yesLabel, noLabel, onYes, onNo){
  let a = $('askBar');
  if (!a){ a = document.createElement('div'); a.id = 'askBar'; a.className = 'box warn'; a.style.cssText = 'min-height:0;padding:12px;margin-bottom:8px'; $('boxSlot').before(a); }
  a.innerHTML = '<div class="l" style="font-size:16px;font-weight:700"></div><div class="ctrl"><button class="go" data-y="1"></button><button class="alt" data-y="0"></button></div>';
  a.querySelector('.l').textContent = text; a.querySelector('[data-y="1"]').textContent = yesLabel; a.querySelector('[data-y="0"]').textContent = noLabel;
  a.onclick = e => { const b = e.target.closest('[data-y]'); if (!b) return; a.onclick = null; a.remove(); (b.dataset.y === '1' ? onYes : onNo)(); };
  window.scrollTo(0, 0);
}
/* Leave and start fresh keeps the name, and asks about marches: in a new battle the base has usually moved. */
$('resetMe').onclick = () => {
  if (!confirm(tr('resetConfirm2'))) return;
  ui.pickT = null; ui.editSym = false;
  setMe({ tgt: null, role: null, sym: '', mode: null, rally: null, solo: null, gs: null, mo: null, readyAt: 0, ep: 0, won: null, helpReq: 0, fromWin: null }).then(() => clearHelpBy()); tick();
  askBar(tr('keepMarQ'), tr('keepMar'), tr('newMar'), () => note(tr('marKept')), () => { prof.mar = {}; saveProf(); ui.editProf = false; renderProfile(true); tick(); });
};
/* Each device remembers when the app was last open; after 24 hours it asks whether this is a new battle. */
const SEEN_KEY = 'tacsync_seen', DAY = 24 * 3600000;
function markSeen(){ try { localStorage.setItem(SEEN_KEY, String(Date.now())); } catch (e) {} }
function askNewBattle(){
  let seen = 0; try { seen = +localStorage.getItem(SEEN_KEY) || 0; } catch (e) {}
  markSeen(); setInterval(markSeen, 60000);
  if (!seen || Date.now() - seen < DAY || !prof.name) return false;
  holdPush = true;
  askBar(tr('newBattleQ'), tr('newBattleYes'), tr('newBattleNo'), () => {
    const keep = { name: prof.name };
    prof = Object.assign({}, PROF0, keep, { mar: {} }); ui.pickT = null; ui.editSym = false; ui.editProf = false;
    holdPush = false; saveProf(); clearHelpBy(); invalidate(); renderProfile(true); tick();
    if (db && pid) setDoc(meRef(), myDocData()).catch(fail); /* replace yesterday's player document */
  }, () => { holdPush = false; if (profileDone()) pushMe(); tick(); });
  return true;
}
/* Presence: refresh my document every 5 minutes so the admin's counts stay current. */
setInterval(() => { if (db && pid && profileDone()) pushMe(); }, 5 * 60000);

function loginForm(){
  let nm = '', em = '';
  try { nm = localStorage.getItem('tacsync_aname') || ''; } catch (e) {}
  if (auth && auth.currentUser && auth.currentUser.email) em = auth.currentUser.email;
  adminSec.hidden = false;
  adminSec.innerHTML = '<div class="card"><div class="row tight">' +
    '<input id="em" type="email" autocomplete="username" class="wide" style="text-transform:none;width:100%;max-width:230px" placeholder="' + esc(tr('emailPh')) + '" aria-label="' + esc(tr('emailPh')) + '" value="' + esc(em) + '">' +
    '<input id="pw" type="password" autocomplete="current-password" class="wide" style="text-transform:none;width:150px" placeholder="' + esc(tr('pw')) + '" aria-label="' + esc(tr('pw')) + '">' +
    (prof.name ? '' : '<input id="gin" dir="auto" maxlength="12" class="wide" style="text-transform:none;width:150px" placeholder="' + esc(tr('ginPh')) + '" aria-label="' + esc(tr('ginPh')) + '" value="' + esc(nm) + '">') +
    '<button data-a="login">' + tr('login') + '</button><button class="alt mini" data-a="closelogin">✕</button></div><div class="err" id="pwErr"></div></div>';
}
$('adminBtn').onclick = () => { if (isAdmin) return; loginForm(); const p = $('em') && !$('em').value ? $('em') : $('pw'); if (p) p.focus(); };

/* ---------- multi-admin control ----------
   One admin holds control. Others watch and may ask for it. All of this lives in its own
   small document (ctl/<room>), so players never receive these updates. */
const FRESH = 60000, STALE = 45000, REQ_TTL = 60000;
const ctlRef = () => doc(db, 'ctl', roomKey);
const tsMs = x => (x && typeof x.toMillis === 'function') ? x.toMillis() : (typeof x === 'number' ? x : 0);
const hasControl = () => !!(isAdmin && C && C.holder === uid && (!C.holderDev || C.holderDev === DEV));
const otherDevice = () => !!(isAdmin && C && C.holder === uid && C.holderDev && C.holderDev !== DEV);
function freshAdmins(c, t){
  const a = (c && c.admins) || {};
  return Object.keys(a).filter(u => t - tsMs(a[u].hb) < FRESH).map(u => ({ uid: u, name: a[u].name || '?', joined: a[u].joined || 0 }));
}
function freshReqs(c, t){
  const r = (c && c.req) || {}, here = new Set(freshAdmins(c, t).map(x => x.uid));
  return Object.keys(r).filter(u => u !== (c && c.holder) && here.has(u) && t - (r[u].t || 0) < REQ_TTL)
    .map(u => ({ uid: u, name: r[u].name || '?', t: r[u].t || 0 }))
    .sort((x, y) => (x.t - y.t) || (x.uid < y.uid ? -1 : 1));
}
/* Who is next in line: people who asked (earliest first), then everyone else (longest here first). */
function successors(c, t, exclude){
  const reqs = freshReqs(c, t).filter(r => r.uid !== exclude), asked = new Set(reqs.map(r => r.uid));
  const rest = freshAdmins(c, t).filter(a => a.uid !== exclude && !asked.has(a.uid))
    .sort((x, y) => (x.joined - y.joined) || (x.uid < y.uid ? -1 : 1));
  return reqs.map(r => ({ uid: r.uid, name: r.name })).concat(rest.map(a => ({ uid: a.uid, name: a.name })));
}
async function joinAdmin(name){
  adminName = name; try { localStorage.setItem('tacsync_aname', name); } catch (e) {}
  const r = ctlRef();
  try {
    await runTransaction(db, async tx => {
      const s = await tx.get(r), me = { name: name, joined: Math.round(now()), hb: serverTimestamp() };
      if (!s.exists()) tx.set(r, { holder: null, holderName: '', holderHb: null, admins: { [uid]: me }, req: {} });
      else tx.update(r, { ['admins.' + uid]: me, ['req.' + uid]: deleteField() });
    });
  } catch (e){ fail(e); return false; }
  await onAdminList();
  isAdmin = true; prevHolder = undefined; vacantSince = null; myReqSent = false; seenReq.clear(); startPlayers();
  msgUI.sig = ''; adminSec.hidden = false; adminSec.innerHTML = skel(); $('adminBtn').hidden = true; loadClips(); loadVoices().then(() => renderAdmin());
  ctlUnsub = onSnapshot(ctlRef(), onCtl, fail);
  clearInterval(hbTimer); clearInterval(ctlTimer);
  hbTimer = setInterval(sendHb, 15000); ctlTimer = setInterval(controlTick, 1000);
  if (D) renderAdmin();
  return true;
}
function sendHb(){
  if (!isAdmin) return;
  const u = { ['admins.' + uid + '.hb']: serverTimestamp() };
  if (hasControl()){ u.holderHb = serverTimestamp(); if (!C.holderDev) u.holderDev = DEV; }
  updateDoc(ctlRef(), u).catch(() => {});
}
async function leaveCtl(){
  clearInterval(hbTimer); clearInterval(ctlTimer); if (ctlUnsub){ ctlUnsub(); ctlUnsub = null; }
  const was = isAdmin; isAdmin = false; C = null; prevHolder = undefined; myReqSent = false; stopPlayers();
  adminSec.hidden = true; adminSec.innerHTML = ''; $('adminBtn').hidden = false;
  if (!was || !uid) return;
  try {
    await runTransaction(db, async tx => {
      const r = ctlRef(), s = await tx.get(r); if (!s.exists()) return;
      const c = s.data(), elsewhere = c.holder === uid && c.holderDev && c.holderDev !== DEV;
      if (elsewhere) return; /* this account still holds control on another device */
      const u = { ['admins.' + uid]: deleteField(), ['req.' + uid]: deleteField() };
      if (c.holder === uid){
        const nx = successors(c, now(), uid)[0];
        if (nx){ u.holder = nx.uid; u.holderDev = null; u.holderName = nx.name; u.holderHb = serverTimestamp(); u['req.' + nx.uid] = deleteField(); }
        else { u.holder = null; u.holderDev = null; u.holderName = ''; }
      }
      tx.update(r, u);
    });
  } catch (e) {}
}
async function tryClaim(){
  if (claiming) return; claiming = true;
  try {
    await runTransaction(db, async tx => {
      const r = ctlRef(), s = await tx.get(r), c = s.data() || {};
      if (c.holder && now() - tsMs(c.holderHb) <= STALE) throw new Error('held');
      const prev = (c.admins && c.admins[uid]) || {};
      tx.update(r, { holder: uid, holderDev: DEV, holderName: adminName, holderHb: serverTimestamp(), ['req.' + uid]: deleteField(),
        ['admins.' + uid]: { name: adminName, joined: prev.joined || Math.round(now()), hb: serverTimestamp() } });
    });
  } catch (e){ if (e.message !== 'held' && !String(e.code || '').includes('permission')) fail(e); }
  finally { claiming = false; }
}
async function transferTo(target){
  try {
    await runTransaction(db, async tx => {
      const r = ctlRef(), s = await tx.get(r), c = s.data();
      if (!c || c.holder !== uid) throw new Error('nothold');
      const rq = c.req && c.req[target];
      if (!rq || now() - (rq.t || 0) > REQ_TTL) throw new Error('noreq');
      const nm = (c.admins && c.admins[target] && c.admins[target].name) || rq.name || '?';
      tx.update(r, { holder: target, holderDev: null, holderName: nm, holderHb: serverTimestamp(), ['req.' + target]: deleteField() });
    });
  } catch (e){ if (e.message === 'noreq') note(tr('ctlNoReq')); else if (e.message !== 'nothold') fail(e); }
}
function requestControl(){
  myReqSent = true;
  updateDoc(ctlRef(), { ['req.' + uid]: { name: adminName, t: Math.round(now()) } }).catch(e => { myReqSent = false; fail(e); });
}
function withdrawReq(){ myReqSent = false; updateDoc(ctlRef(), { ['req.' + uid]: deleteField() }).catch(fail); }
function controlTick(){
  if (!isAdmin || !C || !uid) return;
  const t = now(), mine = C.req && C.req[uid];
  if (mine && t - (mine.t || 0) > REQ_TTL){ myReqSent = false; note(tr('ctlExpired')); updateDoc(ctlRef(), { ['req.' + uid]: deleteField() }).catch(() => {}); }
  if (C.holder === uid) return;
  const vacant = !C.holder || (t - tsMs(C.holderHb) > STALE);
  if (!vacant){ vacantSince = null; return; }
  if (vacantSince == null) vacantSince = Date.now();
  const order = successors(C, t, C.holder || null).map(x => x.uid), idx = order.indexOf(uid);
  if (idx >= 0 && Date.now() - vacantSince >= idx * 2000) tryClaim();
}
function onCtl(s){
  C = s.exists() ? s.data({ serverTimestamps: 'estimate' }) : null;
  if (!C) return;
  const h = C.holder || null, mineNow = hasControl();
  if (prevHolder !== undefined){
    if (mineNow && prevHolder !== true){ note(tr('ctlGained')); beep(660, 200); }
    else if (prevHolder === true && !mineNow){ note(otherDevice() ? tr('ctlOtherDev') : tr('ctlLost', { n: C.holderName || '?' })); }
  }
  prevHolder = mineNow;
  if (myReqSent && !(C.req && C.req[uid])){ if (h !== uid) note(tr('ctlDeclined')); myReqSent = false; }
  if (mineNow) freshReqs(C, now()).forEach(r => { const k = r.uid + ':' + r.t; if (!seenReq.has(k)){ seenReq.add(k); note(tr('reqRow', { n: r.name })); beep(520, 200); } });
  renderAdmin(); controlTick();
}
function renderCtl(){
  const el = $('ctlBar'); if (!el || !C) return;
  const t = now(), mine = hasControl(), here = freshAdmins(C, t), reqs = freshReqs(C, t);
  let h = '<div class="row tight"><b>' + tr('admin') + '</b><span class="pill ' + (mine ? 'live' : '') + '">' +
    (mine ? tr('ctlYou') : otherDevice() ? tr('ctlOtherDev') : C.holder ? tr('ctlView', { n: esc(C.holderName || '?') }) : tr('ctlNone')) +
    '</span><span class="sp"></span><button class="mini alt" data-a="logout">' + tr('logout') + '</button></div>';
  h += '<div class="mut">' + tr('adminsHere') + ': ' + here.map(a => (a.uid === C.holder ? '★ ' : '') + esc(a.name)).join(' · ') + '</div>';
  if (mine){
    reqs.forEach((r, i) => {
      h += '<div class="lrow"><b>#' + (i + 1) + '</b><span>' + tr('reqRow', { n: esc(r.name) }) + '</span><span class="sp"></span>' +
        '<button class="go mini" data-a="xfer" data-u="' + r.uid + '">' + tr('xferBtn') + '</button><button class="alt mini" data-a="decl" data-u="' + r.uid + '">' + tr('declBtn') + '</button></div>';
    });
  } else {
    const idx = reqs.findIndex(r => r.uid === uid);
    if (otherDevice()) h += '<div class="row tight"><button class="mini" data-a="takehere">' + tr('takeHere') + '</button></div>';
    else if (idx >= 0) h += '<div class="row tight"><span class="mut">' + tr('reqSent') + ' · ' + tr('reqQueue', { p: idx + 1 }) + '</span><span class="sp"></span><button class="alt mini" data-a="withdraw">' + tr('reqCancel') + '</button></div>';
    else if (C.holder) h += '<div class="row tight"><button class="mini" data-a="reqctl">' + tr('reqBtn') + '</button></div>';
    h += '<div class="mut">' + tr('viewNote') + '</div>';
  }
  setH(el, h);
}


/* Redraw a part of the admin panel only when its content really changed, so the page does not jump. */
const htmlCache = new WeakMap();
function setH(el, h){
  const k = h + (hasControl() ? '' : '\u0001');
  if (htmlCache.get(el) === k) return;
  htmlCache.set(el, k); el.innerHTML = h;
}


/* ---------- admin: one target at a time ---------- */
const mgT = () => ui.mgT || prof.tgt || 'C';
function skel(){
  return '<div class="card"><div id="ctlBar"></div><div id="helpBar"></div>' +
  '<div class="h">' + tr('mgTarget') + '</div><div id="tBar" class="row tight tbar"></div>' +
  '<div class="tabs"><button id="tabA" data-a="sub" data-m="atk">' + tr('subAtk') + '</button><button id="tabD" data-a="sub" data-m="def">' + tr('subDef') + '</button></div>' +
  '<div id="aAtk"></div><div id="aDef" hidden>' +
  '<div class="row tight"><button class="mini alt" id="heldBtn" data-a="held"></button><span class="sp"></span><b id="defN"></b></div><div class="row tight" id="drRow"></div><div id="ctrRow"></div>' +
  '<div class="h">' + tr('known') + '</div><div id="chips" class="row"></div>' +
  '<div class="h">' + tr('newAttack') + '</div><div class="wcard"><div class="ln"><input id="bName" class="wide" maxlength="12" placeholder="' + esc(tr('namePh')) + '" aria-label="' + esc(tr('namePh')) + '"><span class="mut">' + tr('marchWord') + '</span>' +
  '<button class="s mini alt" data-a="bm" data-d="-1">−</button><input id="bMar" inputmode="numeric" value="0:30" aria-label="' + esc(tr('marchWord')) + '"><button class="s mini alt" data-a="bm" data-d="1">+</button><button class="mini alt" data-a="eupd">' + tr('updBtn') + '</button></div>' +
  '<div class="ln"><button id="phR" class="mini" data-a="ph" data-p="rally">' + tr('rally5') + '</button><button id="phM" class="mini" data-a="ph" data-p="march">' + tr('alreadyMarching') + '</button></div>' +
  '<div class="ln"><span class="mut">' + tr('timerInGame') + '</span><input id="bTim" inputmode="numeric" placeholder="435" aria-label="' + esc(tr('timerInGame')) + '"><span class="mut" id="bEcho"></span><span class="sp"></span>' +
  '<button id="bSync" class="go" data-a="sync">' + tr('syncBtn') + '</button><button id="bCancel" class="alt mini" data-a="bcancel" hidden>✕</button></div></div>' +
  '<div class="row tight"><div class="h" style="margin:0">' + tr('timeline') + '</div><span class="sp"></span><button class="rd mini" data-a="resetdef">' + tr('resetDef') + '</button></div><div id="waves"></div></div>' + nbSkel() + tdlSkel() + admSkel() + msgSkel() + rpSkel() + repSkel() + refSkel() + '</div>';
}
function renderAdmin(){
  if (!isAdmin || !D || !$('aAtk')) return;
  const T = mgT();
  setH($('tBar'), TARGETS.map(x => '<button class="mini ' + (x === T ? '' : 'alt') + (inDef(x) ? ' def' : '') + '" data-a="mg" data-t="' + x + '">' + tn(x) + '</button>').join('') +
    (prof.tgt && prof.tgt !== T ? '<button class="mini alt" data-a="mg" data-t="' + prof.tgt + '">' + tr('myTargetBtn') + '</button>' : ''));
  const def = ui.sub === 'def';
  $('tabA').classList.toggle('on', !def); $('tabD').classList.toggle('on', def);
  $('aAtk').hidden = def; $('aDef').hidden = !def;
  if (def) renderDef(T); else renderAtk(T);
  renderCtl(); renderMsg(); renderHelp(); setH($('aAdm'), admHtml()); { const rl = $('refList'); if (rl && !rl.hidden) setH(rl, refAdminHtml()); } setH($('aTdl'), tdlAdminHtml());
  document.querySelectorAll('#aTdl button,#aNb button').forEach(el => { el.disabled = !hasControl(); });
  const ro = !hasControl();
  document.querySelectorAll('#aMsg button,#aMsg input,#aMsg select').forEach(el => { el.disabled = ro; });
  document.querySelectorAll('#aMsg label').forEach(el => { el.style.opacity = ro ? '.5' : ''; el.style.pointerEvents = ro ? 'none' : ''; });
  document.querySelectorAll('#aDef button,#aDef input,#aDef select,#aRp button,#aRp input').forEach(el => { el.disabled = ro; });
  document.querySelectorAll('#aAtk button,#aAtk input,#aAtk select').forEach(el => { if (ro) el.disabled = true; });
  /* an admin answering a help call may sync and adjust that one lead's rally, with or without control */
  if (ui.helping) document.querySelectorAll('[data-hl="' + ui.helping.lead + '"]').forEach(el => { el.disabled = false; });
  tickAdmin();
}
const rIn = (pre, r) => {
  const p = String(r || '').split('/');
  return '<span class="ratio" dir="ltr">' + [0, 1, 2].map(i => '<input id="' + pre + i + '" class="rt" inputmode="numeric" maxlength="3" value="' + esc(p[i] || '') + '" aria-label="' + esc(tr('ratioPh')) + ' ' + (i + 1) + '">').join('/') + '</span>';
};
function lastRatio(){ try { return localStorage.getItem('tacsync_ratio') || ''; } catch (e) { return ''; } }
/* Rallies running on target T (group launches and solo starts), with their timelines. */
function ralliesOn(T){
  const t = now();
  return leadsOn(T).map(p => ({ p: p, rt: rallyOf(p.uid) })).filter(x => x.rt && rallyPhase(x.rt, t) !== 'pre' && !resOf(x.rt) && !(x.p.won && x.p.won.S === x.rt.S));
}
function renderAtk(T){
  const g = grpOf(T), av = availLeads(T), sel = g.sel || {}, Ls = groupLeads(T), offs = offsetsFor(T, Ls), lobby = g.stage === 'lobby';
  let h = '<div class="h">' + tr('grpHdr') + '</div>';
  h += '<div class="row tight"><span class="mut">' + tr('troops', { r: '' }).trim() + '</span>' + ratioPick('gr', g.ratio || lastRatio()) + '</div>';
  h += '<div class="mut">' + tr(lobby ? 'pickHint' : 'pickLocked') + '</div><div class="row tight">' +
    (av.length ? av.map(l => '<button class="mini ' + (sel[l.uid] ? 'go' : 'alt') + '" data-a="gsel" data-u="' + l.uid + '"' + (lobby ? '' : ' disabled') + ' aria-pressed="' + !!sel[l.uid] + '"><b>' + esc(l.sym) + '</b> ' + esc(l.name || '') + '</button>').join('') : '<span class="mut">' + tr('noAvail') + '</span>') + '</div>';
  if (Ls.length){
    const J = Ls.reduce((n, l) => n + joinersOf(l.uid).length, 0);
    const pv = buildPlan(Ls.map((l, i) => ({ uid: l.uid, march: (l.mar || {})[T] || 0, off: offs[i] })), g.buffer || 10, 0);
    const same = g.same !== false; /* "Same ratio for all rallies": on by default, untick to give each rally its own */
    h += '<div class="h">' + tr('hitOrder') + ' · ' + tr('leadersJoiners', { a: Ls.length, b: J }) + '</div>' +
      '<label class="row tight" style="gap:6px"><input type="checkbox" data-a="gsame"' + (same ? ' checked' : '') + '> ' + tr('sameRatio') + '</label>';
    Ls.forEach((l, i) => {
      const rdy = g.stage === 'ready' ? (l.readyAt || 0) > g.rcAt : g.stage === 'countdown';
      h += '<div class="lrow"><span class="ar"><button class="alt" data-a="up" data-u="' + l.uid + '" aria-label="' + esc(tr('moveUp')) + '">↑</button><button class="alt" data-a="dn" data-u="' + l.uid + '" aria-label="' + esc(tr('moveDown')) + '">↓</button></span>' +
        '<span class="sym ' + (rdy ? 'rdy' : '') + '">' + esc(l.sym) + '</span><span>' + esc(l.name || '') + '</span><b>' + fmtMS((l.mar || {})[T]) + '</b><span class="mut">' + tr('joinedN', { n: joinersOf(l.uid).length }) + '</span><span class="sp"></span>' +
        '<button class="alt s mini" data-a="off" data-u="' + l.uid + '" data-d="-0.1">−</button><b>+' + offs[i].toFixed(1) + '</b><button class="alt s mini" data-a="off" data-u="' + l.uid + '" data-d="0.1">+</button>' +
        '<b class="mut" data-ar="' + l.uid + '" data-pv="' + (pv.launch[l.uid] / 1000).toFixed(1) + '"></b>' +
        (same ? (ratioOf(l.uid) !== g.ratio ? '<span class="ln"><span class="mut">' + tr('ratioOv') + '</span><b>' + esc(fmtR(ratioOf(l.uid))) + '</b> <span class="mut">' + tr('leadOwn') + '</span>' : '<span class="ln">') :
        '<span class="ln"><span class="mut">' + tr('ratioOv') + '</span>' + ratioPick('ov_' + l.uid, ratioOf(l.uid)) + (ratioOf(l.uid) !== g.ratio ? '<button class="mini alt" data-a="ovclr" data-u="' + l.uid + '">' + tr('ovClr') + '</button>' : '')) + '</span></div>';
    });
    h += '<div class="row tight"><span class="mut">' + tr('leadBuffer') + '</span>' + [5, 10, 15, 30].map(n => '<button class="mini ' + ((g.buffer || 10) === n ? '' : 'alt') + '" data-a="buf" data-n="' + n + '">' + n + 's</button>').join('') + '</div>';
  }
  h += '<div class="row">' + (lobby ? '<button class="go" data-a="gstart"' + (Ls.length ? '' : ' disabled') + '>' + tr('startGrp') + '</button>' :
    '<button class="alt" data-a="start"' + (g.stage === 'ready' ? '' : ' disabled') + '>' + tr('startNow') + '</button><button class="rd" data-a="reset">' + tr('reset') + '</button>') + '</div>';
  h += '<div class="mut" id="atkSt"></div>' + (Ls.length ? '<div class="mut">' + tr('offsetsNote') + '</div>' : '');
  const R = ralliesOn(T);
  h += '<div class="h">' + tr('ralliesHdr', { t: tn(T) }) + '</div>';
  if (!R.length) h += '<div class="mut">' + tr('noRallies') + '</div>';
  R.forEach(x => {
    const p = x.p, J = joinersOf(p.uid);
    h += '<div class="wcard' + (ui.helping && ui.helping.lead === p.uid ? ' u' : '') + '"><div class="ln"><span class="sym">' + esc(p.sym) + '</span><span>' + esc(p.name || '') + '</span><span class="mut">' + tr(p.mode === 'solo' ? 'soloTag' : 'groupTag') + '</span>' +
      '<span class="mut">' + esc(fmtR(ratioOf(p.uid))) + '</span><span class="sp"></span><span class="tm" data-rl="' + p.uid + '"></span></div>' +
      '<div class="ln"><input class="wide" style="width:70px" inputmode="numeric" placeholder="' + esc(tr('gatherPh')) + '" data-si="' + p.uid + '" data-hl="' + p.uid + '"><button class="mini" data-a="rsync" data-u="' + p.uid + '" data-hl="' + p.uid + '">' + tr('syncGather') + '</button>' +
      (x.rt.synced ? '<span class="adj">' + [-1, -0.1, 0.1, 1].map(d => '<button data-a="rnudge" data-u="' + p.uid + '" data-hl="' + p.uid + '" data-d="' + d + '">' + (d > 0 ? '+' : '−') + Math.abs(d).toString().replace('0.', '.') + '</button>').join('') + '</span>' : '') + '</div>' +
      '<div class="ln mut">' + (J.length ? J.map(j => '<button class="mini alt" data-a="pickone" data-u="' + j.uid + '">' + esc(j.name || '?') + '</button>').join('') : tr('nobodyJoined')) + '</div></div>';
  });
  if (R.length) h += '<div class="row"><button class="go" data-a="rwin">' + tr('winBtn') + '</button><button class="rd" data-a="rlose">' + tr('failBtn') + '</button></div>';
  setH($('aAtk'), h);
}
/* Help calls: shown to every admin until one answers. The one who answers is taken to the lead's target. */
function helpCalls(){
  const out = []; PL.forEach((p, u) => { if (p.role === 'lead' && p.helpReq && !p.helpBy && p.sym && fresh(p)) out.push(Object.assign({ uid: u }, p)); });
  return out.sort((a, b) => a.helpReq - b.helpReq);
}
function renderHelp(){
  const el = $('helpBar'); if (!el) return;
  let h = '';
  if (ui.helping){
    const p = pdoc(ui.helping.lead) || {}, rt = rallyOf(ui.helping.lead);
    h = '<div class="lrow" style="border-color:var(--am)"><b>' + tr('helpingBar', { s: esc(p.sym || '?'), t: tn(p.target || mgT()) }) + '</b>' +
      (rt ? '' : '<span class="mut">' + tr('helpRallyWait') + '</span>') + '<span class="sp"></span><button class="mini go" data-a="helpdone">' + tr('helpDone') + '</button></div>';
  } else {
    h = helpCalls().map(p => '<button class="rd" style="width:100%;margin:3px 0" data-a="helpgo" data-u="' + p.uid + '">' + tr('helpCallBtn', { s: esc(p.sym), n: esc(p.name || ''), t: tn(p.target) }) + '</button>').join('');
  }
  setH(el, h);
}
async function answerHelp(u){
  const me = { uid: uid, dev: DEV, name: adminName || prof.name || '?', at: Math.round(now()) }, r = playerRef(u);
  try {
    await runTransaction(db, async tx => {
      const s = await tx.get(r), d = s.exists() ? s.data() : null;
      if (!d || !d.helpReq || (d.helpBy && (d.helpBy.uid !== uid || d.helpBy.dev !== DEV))) throw new Error('taken');
      tx.update(r, { helpBy: me });
    });
  } catch (e){ if (e.message === 'taken') note(tr('helpTaken')); else fail(e); return; }
  const p = pdoc(u) || {};
  ui.helping = { lead: u, backT: ui.mgT, backSub: ui.sub };
  ui.mgT = p.target || ui.mgT; ui.sub = 'atk'; msgUI.sig = ''; renderAdmin();
}
function finishHelp(){
  const h = ui.helping; if (!h) return;
  updateDoc(playerRef(h.lead), { helpBy: null, helpReq: 0 }).catch(() => {});
  ui.helping = null; ui.mgT = h.backT; ui.sub = h.backSub || 'atk'; msgUI.sig = ''; renderAdmin();
}
/* A helper's sync and march fixes go on the lead's own document; the controlling admin's otherwise go on the room. */
function rallyFix(u, field, val){
  const T = (pdoc(u) || {}).target || mgT();
  if (ui.helping && ui.helping.lead === u) return updateDoc(playerRef(u), { [field]: val }).catch(fail);
  if (hasControl()) return upd({ ['tg.' + T + '.ov.' + u + '.' + field]: val });
}
function renderDef(T){
  const W = wavesOf(T), E = enemiesOf(T), info = waveInfo(W);
  $('heldBtn').textContent = tr(TG(T).held ? 'heldOn' : 'heldOff');
  setH($('drRow'), '<span class="mut">' + tr('defRatio') + '</span>' + ratioPick('dr', TG(T).dr || ''));
  setH($('ctrRow'), T === 'C' ? ctrAdminHtml() : '');
  const CL = T === 'C' ? countersNow().filter(p => p.uid !== pid || isCtr()) : [];
  const ctrChips = CL.map(p => '<span class="chip"><button class="mini" style="background:#2f6fb0;color:#fff" data-a="ctrpick" data-u="' + p.uid + '">★ ' + esc(p.name || '?') + ' ' + fmtMS((p.mar || {}).C) + ' · ' + tr('ctrTag') + '</button></span>').join('');
  setH($('chips'), ctrChips + (E.length
    ? E.map(e => '<span class="chip"><button class="alt mini" data-a="enemy" data-n="' + esc(e.name) + '">' + esc(e.name) + ' ' + fmtMS(e.march) + (e.ok ? '' : '?') + '</button>' +
        '<button class="alt mini" data-a="enemydel" data-n="' + esc(e.name) + '" aria-label="' + esc(tr('forgetOne', { n: e.name })) + '">✕</button></span>').join('') +
      '<button class="rd mini" data-a="enemyclear">' + tr('forgetAll') + '</button>'
    : (ctrChips ? '' : '<span class="mut">' + tr('knownNone') + '</span>')));
  $('phR').className = 'mini ' + (bar.phase === 'rally' ? '' : 'alt'); $('phM').className = 'mini ' + (bar.phase === 'march' ? '' : 'alt');
  $('bSync').textContent = bar.editId ? tr('resyncBtn') : tr('syncBtn'); $('bCancel').hidden = !bar.editId;
  let h = '';
  info.forEach((w, i) => {
    if (w.gap !== null) h += '<div class="mut ' + (w.urgent ? 'urg' : '') + '" style="margin:2px 0 2px 10px">' + tr('gapLbl', { a: info[i - 1].label, b: w.label, s: w.gap.toFixed(1) }) + '</div>';
    if (w.ctr){
      h += '<div class="wcard" style="border-color:#2f6fb0"><div class="ln"><b>' + w.label + ' ★ ' + esc(w.name) + '</b><span class="tm" data-wv="' + w.id + '"></span><span class="sp"></span><b style="color:#7fb6ff">' + tr('ctrTag') + '</b><span class="mut">' + tr('ctrLand', { s: ctrGap(info, w) }) + '</span></div>' +
        '<div class="ln"><span class="mut">' + tr('ctrOnlyThem') + '</span><span class="sp"></span><button class="s" data-a="wre" data-id="' + w.id + '">' + tr('resyncBtn') + '</button><button class="s" data-a="wdel" data-id="' + w.id + '">✕ ' + tr('removeBtn') + '</button></div></div>';
      return;
    }
    h += '<div class="wcard ' + (w.urgent ? 'u' : '') + '"><div class="ln"><b>' + w.label + ' ' + esc(w.name) + '</b><span class="tm ' + (w.urgent ? 'urg' : '') + '" data-wv="' + w.id + '"></span><span class="sp"></span>' +
      (w.rallyEnd && w.mc === false ? '<span class="urg" style="font-size:11px">' + tr('marNotOkAdm') + '</span>' : '') + '<span class="mut">' + tr('landPlus') + '</span><b>' + (w.off == null ? 0.4 : w.off).toFixed(1) + '</b><button class="s" data-a="woff" data-id="' + w.id + '" data-d="-0.1">−.1</button><button class="s" data-a="woff" data-id="' + w.id + '" data-d="0.1">+.1</button></div>' +
      '<div class="ln"><div class="adj">' + [-1, -0.1, 0.1, 1].map(d => '<button data-a="wsh" data-id="' + w.id + '" data-d="' + d + '">' + (d > 0 ? '+' : '−') + Math.abs(d).toString().replace('0.', '.') + '</button>').join('') +
      '</div><span class="sp"></span><button class="s" data-a="wre" data-id="' + w.id + '">' + tr('resyncBtn') + '</button><button class="s" data-a="wdel" data-id="' + w.id + '">✕ ' + tr('removeBtn') + '</button></div></div>';
  });
  if (!info.length) h = '<div class="mut">' + tr('noAttacks') + '</div>'; else h += '<button class="alt mini" data-a="wclear">' + tr('clearAll') + '</button>';
  setH($('waves'), h);
}
function defCount(T){ let n = 0; PL.forEach(p => { if (p.role === 'def' && p.target === T && fresh(p)) n++; }); if (prof.role === 'def' && prof.tgt === T) n++; return n; }
function tickAdmin(){
  if (!isAdmin || !D || !$('aAtk')) return;
  const t = now(), T = mgT();
  if (ui.sub !== 'def'){
    const g = grpOf(T), plan = g.plan;
    document.querySelectorAll('[data-ar]').forEach(el => {
      const u = el.dataset.ar;
      if (g.stage === 'countdown' && plan && plan.launch[u] != null){
        const rem = plan.launch[u] - t; el.textContent = rem > 0 ? tr('tMinus', { t: fmtCount(rem) }) : tr('launchedLbl');
      } else el.textContent = el.dataset.pv ? tr('startsT', { t: el.dataset.pv }) : '';
    });
    document.querySelectorAll('[data-rl]').forEach(el => {
      const rt = rallyOf(el.dataset.rl); if (!rt) return;
      const ph = rallyPhase(rt, t);
      el.textContent = ph === 'gather' ? tr(rt.synced ? 'phGather' : 'phGatherEst', { x: fmtCount(rt.G - t) }) : ph === 'march' ? tr('phMarch', { x: fmtCount(rt.land - t) }) : tr('phVerify');
    });
    const st = $('atkSt');
    if (st) st.textContent = g.stage === 'countdown' ? (t < g.cdEnd ? tr('stStarting', { n: Math.ceil((g.cdEnd - t) / 1000) }) : tr('stRunning')) : g.stage === 'ready' ? tr('stReadyWait') : '';
  } else {
    const W = wavesOf(T);
    document.querySelectorAll('[data-wv]').forEach(el => {
      const w = W.find(x => x.id === el.dataset.wv); if (!w) return;
      el.textContent = (w.rallyEnd && t < w.rallyEnd) ? tr('rallyW') + ' ' + fmtCount(w.rallyEnd - t) : t < w.landAt ? tr('marchW') + ' ' + fmtCount(w.landAt - t) : tr('landedW');
    });
    const n = $('defN'); if (n) n.textContent = tr('defCount', { n: defCount(T) });
  }
  if (hasControl() && Math.floor(t / 1000) % 10 === 0){
    const u = {};
    TARGETS.forEach(x => { const W = wavesOf(x); if (W.some(w => w.landAt < t - 60000)) u['tg.' + x + '.waves'] = W.filter(w => w.landAt >= t - 60000); });
    if (Object.keys(u).length) upd(u);
  }
}
function clearBar(){ bar.editId = null; bar.ctr = null; const n = $('bName'), tm = $('bTim'), e = $('bEcho'), m = $('bMar'); if (n) n.value = ''; if (tm) tm.value = ''; if (m) m.value = '0:30'; if (e) e.textContent = ''; }

function startCountdown(T){
  const g = grpOf(T), Ls = groupLeads(T); if (!Ls.length) return;
  const offs = offsetsFor(T, Ls), cdEnd = Math.round(now()) + 3500;
  const plan = buildPlan(Ls.map((l, i) => ({ uid: l.uid, march: (l.mar || {})[T] || 0, off: offs[i] })), g.buffer || 10, cdEnd);
  upd({ ['tg.' + T + '.grp.stage']: 'countdown', ['tg.' + T + '.grp.cdEnd']: cdEnd, ['tg.' + T + '.grp.plan']: plan });
}
/* Runs on the admin in control: start a group when every lead is ready, and mark a target held when a solo lead reports a win. */
function adminAuto(){
  if (ui.helping){
    const p = PL.get(ui.helping.lead);
    if (!p || p.role !== 'lead' || !p.helpReq || (p.helpBy && (p.helpBy.uid !== uid || p.helpBy.dev !== DEV))){ const h = ui.helping; ui.helping = null; ui.mgT = h.backT; ui.sub = h.backSub || 'atk'; msgUI.sig = ''; }
  }
  if (!hasControl() || !D) return;
  ctrRetime();
  TARGETS.forEach(T => {
    const g = grpOf(T);
    if (g.stage === 'ready'){
      const Ls = groupLeads(T), key = T + ':' + g.rcAt;
      if (Ls.length && Ls.every(l => (l.readyAt || 0) > g.rcAt) && !starting.has(key)){ starting.add(key); startCountdown(T); }
    }
    if (!TG(T).held){
      let won = false; PL.forEach(p => { if (p.target === T && p.won && now() - p.won.at < 120000) won = true; });
      if (won) upd({ ['tg.' + T + '.held']: true });
    }
  });
}
/* Attack successful / not successful for every rally that has hit target T. */
function resolveTarget(T, kind){
  const R = ralliesOn(T).filter(x => ['march', 'verify'].includes(rallyPhase(x.rt, now()))); if (!R.length) return;
  const u = {}, at = Math.round(now());
  R.forEach(x => { u['tg.' + T + '.res.' + x.p.uid] = { kind: kind, S: x.rt.S, at: at }; });
  const g = grpOf(T);
  if (R.some(x => x.rt.mode === 'group')){
    /* win or not, every lead goes back to the pool: the next attack usually needs a new plan */
    u['tg.' + T + '.grp.stage'] = 'lobby'; u['tg.' + T + '.grp.plan'] = null; u['tg.' + T + '.grp.cdEnd'] = 0;
    u['tg.' + T + '.grp.sel'] = {}; u['tg.' + T + '.grp.order'] = []; u['tg.' + T + '.grp.off'] = {};
  }
  if (kind === 'win') u['tg.' + T + '.held'] = true;
  upd(u);
}

adminSec.addEventListener('input', e => {
  if (e.target.dataset && e.target.dataset.vg != null){ const v = adminSec.querySelector('[data-vgv="' + e.target.dataset.vg + '"]'); if (v) v.textContent = fmtDb(+e.target.value); }
  if (e.target.id === 'bTim'){ const s = parseMS(e.target.value); $('bEcho').textContent = s == null ? '' : '= ' + fmtMS(s); }
  const m = /^gr([01])$/.exec(e.target.id || '');
  if (m){ const a = $('gr0'), b = $('gr1'), c = $('gr2'); if (a.value !== '' && b.value !== ''){ const r = 100 - (parseInt(a.value, 10) || 0) - (parseInt(b.value, 10) || 0); if (r >= 0) c.value = r; } }
});
adminSec.addEventListener('click', async e => {
  const b = e.target.closest('[data-a]'); if (!b) return;
  const a = b.dataset.a;
  if (a === 'login'){
    const gin = $('gin'), nm = (prof.name || (gin && gin.value) || '').trim().slice(0, 12), x = $('pwErr');
    if (!nm){ x.textContent = tr('nameNeeded'); return; }
    if (!prof.name) setMe({ name: nm });
    const oldRef = pid ? meRef() : null, em = $('em').value.trim();
    try {
      await signInWithEmailAndPassword(auth, em, $('pw').value);
    } catch (err){
      switching = false;
      const c = (err && err.code) || '';
      x.textContent = c.includes('operation-not-allowed') ? tr('errEmailOff') : c.includes('too-many') ? tr('tooMany') : /invalid|wrong|not-found|missing/.test(c) ? tr('badLogin') : tr('errGeneric', { m: err.message });
      return;
    }
    try {
      stopFeeds();
      if (oldRef) deleteDoc(oldRef).catch(() => {});
      setIds(); await syncClock(); invalidate(); if (profileDone()) pushMe(); restartListeners();
    } catch (e){ switching = false; fail(e); }
    /* signed in: an account that is not an admin is told so and goes back to being a player */
    if (!(await onAdminList())){
      try { stopFeeds(); await signOut(auth); await signInAnonymously(auth); setIds(); if (profileDone()) pushMe(); restartListeners(); } catch (e) { switching = false; }
      loginForm(); const x2 = $('pwErr'); if (x2) x2.textContent = tr('notAdmin'); return;
    }
    return joinAdmin(nm);
  }
  if (a === 'closelogin'){ adminSec.hidden = true; adminSec.innerHTML = ''; return; }
  if (!isAdmin) return;
  if (a === 'logout'){
    await leaveCtl();
    try {
      await deleteDoc(meRef()).catch(() => {}); stopFeeds();
      await signOut(auth); await signInAnonymously(auth); setIds(); await syncClock(); if (profileDone()) pushMe(); restartListeners();
    } catch (x) { switching = false; fail(x); }
    invalidate(); tick(); return;
  }
  if (a === 'reqctl'){ requestControl(); return; }
  if (a === 'takehere'){ updateDoc(ctlRef(), { holderDev: DEV, holderHb: serverTimestamp() }).catch(fail); return; }
  if (a === 'withdraw'){ withdrawReq(); return; }
  if (a === 'xfer'){ transferTo(b.dataset.u); return; }
  if (a === 'decl'){ updateDoc(ctlRef(), { ['req.' + b.dataset.u]: deleteField() }).catch(fail); return; }
  /* viewing is allowed without control */
  if (a === 'mg'){ ui.mgT = b.dataset.t; ui.sub = inDef(ui.mgT) ? 'def' : 'atk'; clearBar(); msgUI.sig = ''; renderAdmin(); return; }
  if (a === 'sub'){ ui.sub = b.dataset.m; renderAdmin(); return; }
  if (a === 'pickone'){ msgUI.aud = 'one:' + b.dataset.u; msgUI.sig = ''; renderMsg(); const s = $('mAud'); if (s) s.scrollIntoView({ block: 'nearest' }); return; }
  if (a === 'helpgo'){ answerHelp(b.dataset.u); return; }
  if (a === 'helpdone'){ finishHelp(); return; }
  if (D && (a === 'rsync' || a === 'rnudge') && (hasControl() || (ui.helping && ui.helping.lead === b.dataset.u))){
    const u = b.dataset.u;
    if (a === 'rsync'){
      const inp = adminSec.querySelector('[data-si="' + u + '"]'), s = parseMS(inp && inp.value); if (s == null) return note(tr('noteTypeTimer'));
      rallyFix(u, 'gs', { g: Math.round(now() + s * 1000), at: Math.round(now()) }); inp.value = ''; note(tr('syncedOk'));
    } else {
      const rt = rallyOf(u); if (!rt || !rt.synced) return;
      const dd = parseFloat(b.dataset.d), ph = rallyPhase(rt, now());
      if (ph === 'gather') rallyFix(u, 'gs', { g: Math.round(rt.G + dd * 1000), at: Math.round(now()) });
      else if (ph === 'march') rallyFix(u, 'mo', { m: Math.max(1, Math.round((rt.M + dd) * 10) / 10), at: Math.round(now()) });
    }
    return;
  }
  if (!D || !hasControl()) return;
  const T = mgT(), P = 'tg.' + T + '.', g = grpOf(T), W = wavesOf(T), E = enemiesOf(T);
  if (adminExtra(a, b)) return;
  if (a === 'gstart'){
    const r = readPick(adminSec, 'gr');
    if (!r) return note(tr('ratioErr'));
    if (!groupLeads(T).length) return note(tr('noteSelFirst'));
    const u = { [P + 'grp.on']: true, [P + 'grp.stage']: 'ready', [P + 'grp.plan']: null, [P + 'grp.order']: groupLeads(T).map(l => l.uid), [P + 'grp.rcAt']: Math.round(now()) };
    if (r !== g.ratio){ u[P + 'grp.ratio'] = r; u[P + 'grp.rAt'] = Math.round(now()); } /* a lead's own pick made earlier still wins over an unchanged group ratio */
    upd(u);
  }
  else if (a === 'rpset'){ applyPick(b.dataset.p, b.closest('.rpick')); }
  else if (a === 'gsame'){
    const on = b.checked, t = Math.round(now());
    upd(on ? { [P + 'grp.same']: true, [P + 'grp.rOv']: {}, [P + 'grp.rAt']: t } : { [P + 'grp.same']: false }); /* ticking it puts every rally back on the group ratio */
  }
  else if (a === 'ovclr'){ upd({ [P + 'grp.rOv.' + b.dataset.u]: { r: g.ratio || '', at: Math.round(now()) } }); }
  else if (a === 'gsel'){ if (g.stage !== 'lobby') return; const u = b.dataset.u; upd({ [P + 'grp.sel.' + u]: (g.sel || {})[u] ? deleteField() : true }); }
  else if (a === 'up' || a === 'dn'){
    const ord = groupLeads(T).map(l => l.uid), i = ord.indexOf(b.dataset.u), j = a === 'up' ? i - 1 : i + 1;
    if (j < 0 || j >= ord.length) return;
    [ord[i], ord[j]] = [ord[j], ord[i]]; upd({ [P + 'grp.order']: ord, [P + 'grp.off']: {} });
  }
  else if (a === 'off'){
    const Ls = groupLeads(T), offs = offsetsFor(T, Ls), i = Ls.findIndex(l => l.uid === b.dataset.u);
    upd({ [P + 'grp.off.' + b.dataset.u]: Math.max(0, Math.round((offs[i] + parseFloat(b.dataset.d)) * 10) / 10) });
  }
  else if (a === 'buf'){ upd({ [P + 'grp.buffer']: parseInt(b.dataset.n, 10) }); }
  else if (a === 'start'){ if (!groupLeads(T).length) return note(tr('noteNoLeaders')); startCountdown(T); }
  else if (a === 'reset'){ if (confirm(tr('resetOpConfirm'))) upd({ [P + 'grp.stage']: 'lobby', [P + 'grp.plan']: null, [P + 'grp.cdEnd']: 0 }); }
  else if (a === 'rwin'){ if (confirm(tr('winQ', { t: tn(T) }))) resolveTarget(T, 'win'); }
  else if (a === 'rlose'){ if (confirm(tr('failQ', { t: tn(T) }))) resolveTarget(T, 'fail'); }
  /* defense */
  else if (a === 'held'){ upd({ [P + 'held']: !TG(T).held }); }
  else if (a === 'resetdef'){ if (confirm(tr('resetDefConfirm'))){ upd({ [P + 'waves']: [] }); clearBar(); $('bMar').value = '0:30'; renderAdmin(); } }
  else if (a === 'enemydel'){ upd({ [P + 'enemies']: E.filter(x => x.name !== b.dataset.n) }); }
  else if (a === 'enemyclear'){ if (confirm(tr('forgetAllConfirm'))) upd({ [P + 'enemies']: [] }); }
  else if (a === 'enemy'){ const en = E.find(x => x.name === b.dataset.n); if (!en) return; $('bName').value = en.name; $('bMar').value = fmtMS(en.march); $('bTim').focus(); }
  else if (a === 'bm'){ const m = parseMS($('bMar').value) || 30; $('bMar').value = fmtMS(Math.max(1, m + parseInt(b.dataset.d, 10))); }
  else if (a === 'ph'){ bar.phase = b.dataset.p; renderAdmin(); }
  else if (a === 'bcancel'){ clearBar(); renderAdmin(); }
  else if (a === 'eupd'){
    const name = $('bName').value.trim().toUpperCase().slice(0, 12), march = parseMS($('bMar').value);
    if (!name || !march) return note(tr('noteEnemyName'));
    upd({ [P + 'enemies']: E.filter(x => x.name !== name).concat([{ name: name, march: march, ok: true }]), [P + 'waves']: retimeWaves(W, name, march, now()) });
    note(tr('enemySaved', { n: name, t: fmtMS(march) }));
  }
  else if (a === 'sync'){
    const name = ($('bName').value.trim() || 'ENEMY').toUpperCase().slice(0, 12);
    const cu = bar.ctr && T === 'C' && PL.get(bar.ctr) ? bar.ctr : (bar.editId && (W.find(x => x.id === bar.editId) || {}).ctr) || null;
    const known = cu ? { name: name, march: (PL.get(cu).mar || {}).C || 30, ok: true } : E.find(x => x.name === name);
    const march = parseMS($('bMar').value) || (known ? known.march : 30), timer = parseMS($('bTim').value);
    if (timer == null) return note(tr('noteTypeTimer'));
    if (!bar.editId && W.length >= 6) return note(tr('noteLimit'));
    const t = Math.round(now());
    const rallyEnd = bar.phase === 'rally' ? t + timer * 1000 : null, landAt = bar.phase === 'rally' ? rallyEnd + march * 1000 : t + timer * 1000;
    const old = bar.editId ? W.find(x => x.id === bar.editId) : null;
    const ok = !!(known && known.ok && known.march === march);
    const w = { id: bar.editId || ('w' + t), name: name, march: march, rallyEnd: rallyEnd, landAt: landAt, off: old && old.off != null ? old.off : 0.4, mc: ok };
    if (cu){ w.ctr = cu; w.mc = true; }
    const nw = old ? W.map(x => x.id === w.id ? w : x) : W.concat([w]);
    upd(cu ? { [P + 'waves']: nw } : { [P + 'waves']: nw, [P + 'enemies']: E.filter(x => x.name !== name).concat([{ name: name, march: march, ok: ok }]) });
    clearBar();
  }
  else if (a === 'woff' || a === 'wsh' || a === 'wre' || a === 'wdel' || a === 'wclear'){
    if (a === 'wclear'){ if (confirm(tr('clearAllConfirm'))) upd({ [P + 'waves']: [] }); return; }
    const w = W.find(x => x.id === b.dataset.id); if (!w) return;
    if (a === 'wdel') return upd({ [P + 'waves']: W.filter(x => x.id !== w.id) });
    if (a === 'wre'){
      bar.editId = w.id; bar.phase = (w.rallyEnd && now() < w.rallyEnd) ? 'rally' : 'march';
      $('bName').value = w.name; $('bMar').value = fmtMS(w.march); $('bTim').value = ''; $('bTim').focus(); return renderAdmin();
    }
    const d = parseFloat(b.dataset.d);
    if (a === 'wsh' && w.rallyEnd && now() >= w.rallyEnd && now() < w.landAt){
      const m = Math.max(1, Math.round((w.march + d) * 10) / 10);
      return upd({ [P + 'waves']: retimeWaves(W, w.name, m, now()),
        [P + 'enemies']: E.some(x => x.name === w.name) ? E.map(x => x.name === w.name ? { name: x.name, march: m, ok: true } : x) : E.concat([{ name: w.name, march: m, ok: true }]) });
    }
    const nw = W.map(x => {
      if (x.id !== w.id) return x;
      if (a === 'woff') return Object.assign({}, x, { off: Math.max(0, Math.round(((x.off == null ? 0.4 : x.off) + d) * 10) / 10) });
      return Object.assign({}, x, { landAt: x.landAt + Math.round(d * 1000), rallyEnd: x.rallyEnd ? x.rallyEnd + Math.round(d * 1000) : null });
    });
    upd({ [P + 'waves']: nw });
  }
});
adminSec.addEventListener('change', e => {
  return;
});

/* ---------- ratio presets: set by the admin before the fight ---------- */
function rpSkel(){ return '<div id="aRp"><div class="row tight"><button class="alt mini" data-a="rpedit" id="rpEditBtn">' + tr('rpHdr') + '</button></div><div id="rpEd" hidden></div></div>'; }
function rpRow(p){
  const n = String(p.r || '').split('/');
  return '<div class="ln rprow"><input class="wide" maxlength="14" style="width:110px" data-rpn value="' + esc(p.n || '') + '" aria-label="' + esc(tr('rpName')) + '"><span class="ratio" dir="ltr">' +
    [0, 1, 2].map(i => '<input class="rt" inputmode="numeric" maxlength="3" data-rpv="' + i + '" value="' + esc(n[i] || '') + '" aria-label="' + esc(tr('ratioPh')) + ' ' + (i + 1) + '">').join('/') +
    '</span><button class="mini alt" data-a="rpdel" aria-label="' + esc(tr('delBtn')) + '">✕</button></div>';
}
function rpOpen(){ const e = $('rpEd'); e.innerHTML = presets().map(rpRow).join('') + '<div class="row tight"><button class="mini alt" data-a="rpadd">' + tr('rpAdd') + '</button><button class="mini go" data-a="rpsave">' + tr('rpSave') + '</button></div>'; e.hidden = false; }
function rpSave(){
  const out = [], names = new Set();
  for (const row of $('rpEd').querySelectorAll('.rprow')){
    const n = row.querySelector('[data-rpn]').value.replace(/\|/g, '').trim(), v = Array.from(row.querySelectorAll('[data-rpv]')).map(i => i.value);
    if (!n && !v.join('')) continue;
    const r = parseRatio(v[0], v[1], v[2]);
    if (!n || !r || names.has(n.toLowerCase())) return note(tr('rpErr'));
    names.add(n.toLowerCase()); out.push({ n: n, r: r });
  }
  if (!out.length || out.length > 10) return note(tr('rpErr'));
  upd({ rp: out }); $('rpEd').hidden = true; note(tr('rpSaved'));
}
adminSec.addEventListener('click', e => {
  const b = e.target.closest('[data-a]'); if (!b || !hasControl()) return;
  const a = b.dataset.a;
  if (a === 'rpedit'){ if ($('rpEd').hidden) rpOpen(); else $('rpEd').hidden = true; }
  else if (a === 'rpadd'){ $('rpEd').querySelector('.row').insertAdjacentHTML('beforebegin', rpRow({ n: '', r: '' })); }
  else if (a === 'rpdel'){ b.closest('.rprow').remove(); }
  else if (a === 'rpsave'){ rpSave(); }
});
wirePick(adminSec);

/* How the counter lands against the enemy attacks: seconds after the last one (5-10 s is the aim), or too early. */
function ctrGap(info, w){
  const en = info.filter(x => !x.ctr); if (!en.length) return '—';
  const last = Math.max.apply(null, en.map(x => x.landAt)), d = (w.landAt - last) / 1000;
  return (d >= 0 ? '+' : '') + d.toFixed(1) + ' s ' + (d < 0 ? tr('ctrEarly') : d < 5 ? tr('ctrTight') : d <= 10 ? tr('ctrGood') : tr('ctrLate'));
}

/* ---------- messages and recorded voice ----------
   A message is one small field on the room document (the latest only). Recordings are
   kept as small documents under the room and fetched once by players who chose them. */
const CLIP_DIR = 'clips/', VOICE_MAX = 700 * 1024;
/* Built-in recordings shipped with the app. Each falls back to the device voice when missing. */
const CLIP_FILE = { c3: '3.wav', c2: '2.wav', c1: '1.wav', cs: 'send.wav', cj: 'join.mp3', so: 'sound.mp3', tu: 'tutorial.mp3', rf: 'reinforce.mp3', vf: 'verifying.mp3', db: 'disbanded.mp3', df: 'defense.mp3' };
const CD_CLIPS = [['c3', '3'], ['c2', '2'], ['c1', '1'], ['cs', 'say_send'], ['cj', 'say_join'], ['rf', 'say_reinforce'], ['vf', 'say_verify'], ['db', 'say_disband'], ['df', 'say_defense'], ['so', 'say_sound'], ['tu', 'tutRetSay']];
const voiceRef = i => doc(db, 'rooms', roomKey, 'clips', 'v' + i);
const msgStyle = document.createElement('style');
msgStyle.textContent = '#msgBar{display:flex;gap:8px;align-items:center;background:#2a2206;border:2px solid var(--am);border-radius:10px;padding:8px 10px;margin:8px 0;font-weight:800;font-size:15px;color:#ffe9a8}' +
  '#msgBar[hidden]{display:none}#msgBar span{flex:1;unicode-bidi:plaintext}#boxMsg{position:absolute;top:0;left:0;right:0;background:var(--am);color:#1a1300;font-weight:800;font-size:14px;padding:4px 8px;border-radius:8px 8px 0 0;z-index:2;unicode-bidi:plaintext}' +
  '#aMsg .ed input{text-transform:none}#aMsg .tx{text-transform:none;flex:1;width:auto;min-width:120px;text-align:start}#aMsg select{border-radius:6px;padding:6px;font-size:13px;max-width:100%}';
document.head.append(msgStyle);
const msgBar = document.createElement('div');
msgBar.id = 'msgBar'; msgBar.hidden = true; msgBar.setAttribute('role', 'status');
const msgSpan = document.createElement('span'), msgX = document.createElement('button');
msgX.className = 'alt mini'; msgX.textContent = '✕'; msgX.dataset.al = 'msgClose';
msgBar.append(msgSpan, msgX);
$('boxSlot').before(msgBar);
const boxMsg = document.createElement('div');
boxMsg.id = 'boxMsg'; boxMsg.hidden = true;
box.prepend(boxMsg);
msgX.onclick = () => { MSG.closed = true; msgTick(); };
const voiceBtn = document.createElement('button');
voiceBtn.id = 'voiceBtn'; voiceBtn.className = 'mini alt';
$('sound').after(voiceBtn);
voiceBtn.onclick = () => {
  voiceMode = voiceMode === 'rec' ? 'dev' : 'rec';
  try { localStorage.setItem('tacsync_voice', voiceMode); } catch (e) {}
  refreshStatic();
  if (voiceMode !== 'rec') return;
  loadClips().then(() => { if (!Object.keys(CLIP.buf).length) note(tr('voiceNone')); else if (!soundOn) note(tr('voiceNeedSound')); }); loadVoices();
};

function nameList(a){ return a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + tr('andWord') + a[a.length - 1]; }
function msgText(m){
  if (m.k === 'b3'){ const n = m.names || []; return n.length === 1 ? tr('suckOne', { n: n[0] }) : tr('suckTie', { n: nameList(n) }); }
  return m.k === 'b1' ? tr('msgB1') : m.k === 'b2' ? tr('msgB2') : (m.text || '');
}
/* The players with the most help requests in this room (all of them, if tied). */
function mostHelped(){
  const all = []; PL.forEach(p => { if (p.name && p.helps > 0) all.push(p); });
  if (prof.name && prof.helps > 0 && !PL.has(pid)) all.push({ name: prof.name, helps: prof.helps });
  const top = all.reduce((x, p) => Math.max(x, p.helps), 0);
  return top ? all.filter(p => p.helps === top).map(p => p.name).sort((a, b) => a.localeCompare(b)) : [];
}
/* Runs every tick. The app banner stays 1 minute or until closed. The pop-out shows it for 8 seconds. */
function msgTick(){
  const m = MSG.cur, age = m ? Date.now() - MSG.shownAt : Infinity, txt = m ? msgText(m) : '';
  const bar = !!m && age < 60000 && !MSG.closed, pop = !!m && age < 8000;
  if (msgBar.hidden === bar) msgBar.hidden = !bar;
  if (bar && msgSpan.textContent !== txt) msgSpan.textContent = txt;
  const inBox = pop && popped;
  if (boxMsg.hidden === inBox) boxMsg.hidden = !inBox;
  if (inBox && boxMsg.textContent !== txt) boxMsg.textContent = txt;
  return pop ? txt : null;
}
function onMsg(){
  const m = D.msg;
  if (m && m.id !== MSG.seen){
    MSG.seen = m.id;
    if (now() - m.at < 60000 && msgFor(m, pid, prof)){
      MSG.cur = m; MSG.shownAt = Date.now(); MSG.closed = false;
      beep(740, 180); if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
    }
  }
  const x = D.vox;
  if (x && x.id !== MSG.voxSeen){
    MSG.voxSeen = x.id;
    if (now() - x.at < 15000 && msgFor(x, pid, prof) && soundOn && voiceMode === 'rec') loadVoices().then(() => { playClip('v' + x.slot); });
  }
}

/* ----- recordings: audio files in the clips folder beside the app -----
   Loaded once per page, by players who chose the recorded voice and by admins. No database reads. */
function audioCtx(){ actx = actx || new (window.AudioContext || window.webkitAudioContext)(); return actx; }
function ensureAudio(){ audioCtx().resume(); }
function decode(ab){ return new Promise((res, rej) => { const p = audioCtx().decodeAudioData(ab, res, rej); if (p && p.catch) p.catch(rej); }); }
async function loadOne(id){
  try {
    const r = await fetch(CLIP_DIR + CLIP_FILE[id]);
    if (r.ok){ CLIP.buf[id] = await decode(await r.arrayBuffer()); CLIP.state[id] = CLIP_FILE[id]; return; }
  } catch (e) {}
  CLIP.state[id] = '';
}
function loadClips(){
  if (!CLIP.p) CLIP.p = Promise.all(Object.keys(CLIP_FILE).map(loadOne)).then(() => { if (isAdmin){ msgUI.edit && refreshEditor(); renderAdmin(); } });
  return CLIP.p;
}
/* Voice-button clips are cleaned on each device as they load (the uploaded file is not changed):
   low hum cut below 90 Hz, background noise between words (more than 16 dB under the speech) turned down about 16 dB, then brought to one standard level
   (speech near -18 dB, peaks under -3 dB) plus the admin's volume setting for that button. */
function cleanVoice(src, gDb){
  const sr = src.sampleRate, n = src.length, C = src.numberOfChannels, out = audioCtx().createBuffer(C, n, sr);
  const w0 = 2 * Math.PI * 90 / sr, al = Math.sin(w0) / Math.SQRT2, cs = Math.cos(w0), a0 = 1 + al;
  const b0 = (1 + cs) / 2 / a0, b1 = -(1 + cs) / a0, b2 = b0, a1 = -2 * cs / a0, a2 = (1 - al) / a0;
  const ch = [];
  for (let c = 0; c < C; c++){
    const x = src.getChannelData(c), y = new Float32Array(n); let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    for (let i = 0; i < n; i++){ const v = b0 * x[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2; x2 = x1; x1 = x[i]; y2 = y1; y1 = v; y[i] = v; }
    ch.push(y);
  }
  const W = Math.max(1, Math.round(sr * 0.02)), nw = Math.ceil(n / W), lv = new Float32Array(nw);
  for (let k = 0; k < nw; k++){ let s = 0, m = 0; for (let i = k * W; i < Math.min(n, k * W + W); i++) for (let c = 0; c < C; c++){ s += ch[c][i] * ch[c][i]; m++; } lv[k] = 10 * Math.log10(s / Math.max(1, m) + 1e-12); }
  const srt = Array.from(lv).sort((a, b) => a - b), sp = srt[Math.floor(0.9 * (nw - 1))], thr = sp - 16;
  const att = 1 - Math.exp(-1 / (sr * 0.005)), rel = 1 - Math.exp(-1 / (sr * 0.06));
  let g = lv[0] < thr ? 0.15 : 1, pk = 0; const gate = new Float32Array(n);
  for (let i = 0; i < n; i++){ const want = lv[Math.floor(i / W)] < thr ? 0.15 : 1; g += (want - g) * (want > g ? att : rel); gate[i] = g; for (let c = 0; c < C; c++) pk = Math.max(pk, Math.abs(ch[c][i] * g)); }
  const k = Math.min(Math.pow(10, (-18 - sp + (gDb || 0)) / 20), 0.708 / Math.max(pk, 1e-6));
  for (let c = 0; c < C; c++){ const y = ch[c], o = out.getChannelData(c); for (let i = 0; i < n; i++) o[i] = y[i] * gate[i] * k; }
  return out;
}
function setVoice(id, raw, gDb){ CLIP.raw[id] = raw; CLIP.vg[id] = gDb || 0; try { CLIP.buf[id] = cleanVoice(raw, gDb); } catch (e) { CLIP.buf[id] = raw; } }
/* Voice-button clips uploaded by the admin. Fetched once, and again only when replaced. */
function b64ToBuf(b){ const s = atob(b), u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u.buffer; }
function bufToB64(ab){ const u = new Uint8Array(ab); let s = ''; for (let i = 0; i < u.length; i += 8192) s += String.fromCharCode.apply(null, u.subarray(i, i + 8192)); return btoa(s); }
async function loadVoices(){
  if (!db || !D || (!isAdmin && !(soundOn && voiceMode === 'rec'))) return;
  const have = (D && D.vclip) || {}, jobs = [];
  for (let i = 0; i < 6; i++){
    const id = 'v' + i, e = have[id];
    if (!e){ if (CLIP.vver[id]){ delete CLIP.vver[id]; delete CLIP.buf[id]; } continue; }
    if (CLIP.vver[id] === e.v){ if (CLIP.raw[id] && CLIP.vg[id] !== (e.g || 0)) setVoice(id, CLIP.raw[id], e.g); continue; }
    if (!CLIP.vload[id] || CLIP.vload[id].v !== e.v){
      const job = getDoc(voiceRef(i)).then(async sn => {
        if (!sn.exists()) return;
        setVoice(id, await decode(b64ToBuf(sn.data().d)), ((D && D.vclip || {})[id] || {}).g); CLIP.vver[id] = e.v;
      }).catch(() => {}).finally(() => { if (CLIP.vload[id] === job) delete CLIP.vload[id]; });
      job.v = e.v; CLIP.vload[id] = job;
    }
    jobs.push(CLIP.vload[id]);
  }
  await Promise.all(jobs);
}
async function uploadVoice(i, file){
  if (!file) return;
  if (file.size > VOICE_MAX){ note(tr('fileTooBig')); return; }
  note(tr('fileSaving'));
  try {
    const ab = await file.arrayBuffer();
    let buf; try { buf = await decode(ab.slice(0)); } catch (e){ note(tr('fileBad')); return; }
    const ver = Date.now();
    await setDoc(voiceRef(i), { d: bufToB64(ab), v: ver, f: file.name.slice(0, 40), t: file.type || '' });
    setVoice('v' + i, buf, 0); CLIP.vver['v' + i] = ver;
    await upd({ ['vclip.v' + i]: { v: ver, f: file.name.slice(0, 40) } });
    note(tr('clipSaved'));
  } catch (e){ fail(e); }
}
function playClip(id){
  const b = CLIP.buf[id]; if (!b || !actx) return false;
  try { const src = actx.createBufferSource(); src.buffer = b; src.connect(actx.destination); src.start(); return true; } catch (e){ return false; }
}

/* ----- admin panel: messages ----- */
const msgUI = { aud: 'all', edit: false, sig: '', last: '' };
function presetsNow(){ const p = (D && D.presets) || []; return [0, 1, 2, 3, 4, 5].map(i => ({ l: (p[i] && p[i].l) || '', t: (p[i] && p[i].t) || '' })); }
function vlabelsNow(){ const v = (D && D.vlabels) || []; return [0, 1, 2, 3, 4, 5].map(i => v[i] || ''); }
function audParts(){ const v = msgUI.aud, i = v.indexOf(':'); return i < 0 ? { aud: v, to: null } : { aud: v.slice(0, i), to: v.slice(i + 1) }; }
function audLabel(aud, to){
  const p = pdoc(to) || {}, s = p.sym || '?';
  return aud === 'all' ? tr('audAll') : aud === 'tgt' ? tr('audTgt', { t: tn(to) }) : aud === 'leads' ? tr('audLeads') : aud === 'joiners' ? tr('audJoiners') :
    aud === 'lead' ? tr('audLead', { s: s }) : aud === 'one' ? (p.name || '?') : tr('audRally', { s: s });
}
/* Everyone with a name, A to Z, with target and role so two players with the same name can be told apart. */
function playerList(){
  const all = []; PL.forEach((p, u) => { if (p.name && fresh(p)) all.push(Object.assign({ uid: u }, p)); });
  if (prof.name && !PL.has(pid)) all.push(pdoc(pid));
  const cnt = {}; all.forEach(p => { const k = p.name.toLowerCase(); cnt[k] = (cnt[k] || 0) + 1; });
  return all.sort((a, b) => a.name.localeCompare(b.name)).map(p => {
    const r = p.role === 'lead' ? tr('roleLeadSym', { s: p.sym || '' }) : p.role === 'join' ? tr('roleJoinOf', { s: (pdoc(p.rally) || {}).sym || '…' }) : p.role === 'def' ? tr('roleDef') : '';
    return { uid: p.uid, label: p.name + (p.target ? ' · ' + tn(p.target) : '') + (r ? ' · ' + r : '') + (cnt[p.name.toLowerCase()] > 1 ? ' ' + tr('dupMark') : '') };
  });
}
function msgSkel(){
  return '<div id="aMsg"><div class="h">' + tr('msgHdr') + '</div>' +
    '<div class="row tight"><span class="mut">' + tr('msgTo') + '</span><select id="mAud" aria-label="' + esc(tr('msgTo')) + '"></select><input id="mFilt" class="tx" style="max-width:130px" placeholder="' + esc(tr('audFilter')) + '" aria-label="' + esc(tr('audFilter')) + '"></div>' +
    '<div class="row tight"><input id="mTxt" class="tx" maxlength="40" placeholder="' + esc(tr('msgPh')) + '" aria-label="' + esc(tr('msgPh')) + '"><button data-a="msend">' + tr('sendBtn') + '</button></div>' +
    '<div id="mBtns" class="row"></div><div id="vBtns" class="row"></div><div class="mut" id="mLast"></div>' +
    '<div class="row tight"><button class="alt mini" id="mEditBtn" data-a="medit"></button></div><div id="mEdit" hidden></div></div>';
}
function clipCtl(id){
  return '<span class="mut" data-cs="' + id + '"></span><span class="sp"></span><button class="mini alt" data-a="cplay" data-c="' + id + '">' + tr('playBtn') + '</button>';
}
function voiceCtl(i){
  return '<span class="mut" data-cs="v' + i + '" style="max-width:84px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"></span><span class="sp"></span>' +
    '<label class="mini" style="background:var(--am);color:#1a1300;border-radius:7px;padding:5px 9px;font-weight:800;font-size:12px;cursor:pointer">' + tr('chooseFile') +
    '<input type="file" accept="audio/*,.mp3,.m4a,.wav" data-up="' + i + '" hidden></label>' +
    '<button class="mini alt" data-a="cplay" data-c="v' + i + '">' + tr('playBtn') + '</button><button class="mini alt" data-a="vdel" data-i="' + i + '" aria-label="' + esc(tr('delBtn')) + '">✕</button>' +
    '<span class="ln" style="width:100%;gap:6px"><span class="mut">' + tr('vVol') + '</span><input type="range" min="-12" max="6" step="1" data-vg="' + i + '" aria-label="' + esc(tr('vVol') + ' ' + (i + 1)) + '" value="' + (((D && D.vclip || {})['v' + i] || {}).g || 0) + '" style="flex:1;min-width:90px"><b data-vgv="' + i + '">' + fmtDb(((D && D.vclip || {})['v' + i] || {}).g || 0) + '</b></span>';
}
const fmtDb = g => (g > 0 ? '+' : '') + g + ' dB';
function refreshEditor(){
  const vc = (D && D.vclip) || {};
  adminSec.querySelectorAll('[data-cs]').forEach(el => {
    const id = el.dataset.cs;
    if (id[0] === 'v'){ el.textContent = vc[id] ? vc[id].f : tr('noClip'); return; }
    const f = CLIP.state[id]; el.textContent = f == null ? '…' : f ? tr('builtIn') : tr('noClip');
  });
}
function editorHtml(){
  const P = presetsNow(), VL = vlabelsNow();
  let h = '<div class="h">' + tr('textBtns') + '</div>';
  P.forEach((p, i) => {
    h += '<div class="ln ed"><input id="pl' + i + '" class="wide" maxlength="12" placeholder="' + esc(tr('labelPh')) + '" aria-label="' + esc(tr('labelPh')) + ' ' + (i + 1) + '" value="' + esc(p.l) + '">' +
      '<input id="pt' + i + '" class="tx" maxlength="40" placeholder="' + esc(tr('textPh')) + '" aria-label="' + esc(tr('textPh')) + ' ' + (i + 1) + '" value="' + esc(p.t) + '"></div>';
  });
  h += '<div class="h">' + tr('voiceBtns') + '</div><div class="mut">' + tr('voiceHint') + '</div><div class="mut">' + tr('clipHint') + '</div>';
  VL.forEach((l, i) => {
    h += '<div class="ln ed" style="flex-wrap:nowrap"><input id="vl' + i + '" class="wide" style="width:88px;flex:none" maxlength="12" placeholder="' + esc(tr('labelPh')) + '" aria-label="' + esc(tr('voiceN', { n: i + 1 })) + '" value="' + esc(l) + '">' + voiceCtl(i) + '</div>';
  });
  h += '<div class="h">' + tr('cdClips') + '</div>';
  CD_CLIPS.forEach(c => { h += '<div class="ln ed"><b style="min-width:90px;max-width:55%">' + esc(c[1].length > 1 ? tr(c[1]) : c[1]) + '</b>' + clipCtl(c[0]) + '</div>'; });
  return h + '<div class="row"><button data-a="msave">' + tr('savePresets') + '</button></div>';
}
function renderMsg(){
  const sel = $('mAud'); if (!sel || !D) return;
  const T = mgT(), L = []; TARGETS.forEach(x => leadsOn(x).forEach(l => L.push(l)));
  const flt = (($('mFilt') || {}).value || '').trim().toLowerCase(), PLs = playerList().filter(p => !flt || p.label.toLowerCase().includes(flt));
  const sig = lang + '|' + T + '|' + flt + '|' + L.map(l => l.uid + l.sym).join(',') + '|' + PLs.map(p => p.uid + p.label).join(',');
  if (sig !== msgUI.sig){
    msgUI.sig = sig;
    const grp = (title, opts) => opts.length ? '<optgroup label="' + esc(title) + '">' + opts.map(o => '<option value="' + esc(o[0]) + '">' + esc(o[1]) + '</option>').join('') + '</optgroup>' : '';
    const gen = [['all', tr('audAll')], ['tgt:' + T, tr('audTgt', { t: tn(T) })], ['leads', tr('audLeads')], ['joiners', tr('audJoiners')]];
    const ld = L.map(l => ['lead:' + l.uid, tr('audLead', { s: l.sym }) + ' · ' + tn(l.target)]), rj = L.map(l => ['rally:' + l.uid, tr('audRally', { s: l.sym })]);
    const one = PLs.map(p => ['one:' + p.uid, p.label]);
    const vals = gen.concat(ld, rj, one).map(o => o[0]);
    if (!vals.includes(msgUI.aud)) msgUI.aud = flt && one.length ? one[0][0] : 'all';
    sel.innerHTML = grp(tr('audGeneral'), gen) + grp(tr('audLeadsGrp'), ld) + grp(tr('audRallies'), rj) + grp(tr('audPlayers'), one);
  }
  if (sel.value !== msgUI.aud) sel.value = msgUI.aud;
  const P = presetsNow(), VL = vlabelsNow();
  setH($('mBtns'), '<button class="mini" data-a="mb" data-k="b1">' + tr('msgB1') + '</button><button class="mini" data-a="mb" data-k="b2">' + tr('msgB2') + '</button><button class="mini rd" data-a="mb" data-k="b3">' + tr('msgB3') + '</button>' +
    P.map((p, i) => p.t ? '<button class="mini alt" data-a="mp" data-i="' + i + '">' + esc(p.l || p.t.slice(0, 12)) + '</button>' : '').join(''));
  setH($('vBtns'), VL.map((l, i) => (D.vclip || {})['v' + i] ? '<button class="mini alt" data-a="vb" data-i="' + i + '">♪ ' + esc(l || tr('voiceN', { n: i + 1 })) + '</button>' : '').join(''));
  $('mLast').textContent = msgUI.last;
  $('mEditBtn').textContent = tr(msgUI.edit ? 'doneEdit' : 'editPresets');
  const ed = $('mEdit');
  if (msgUI.edit && ed.hidden){ ed.innerHTML = editorHtml(); ed.hidden = false; }
  else if (!msgUI.edit && !ed.hidden){ ed.hidden = true; ed.innerHTML = ''; }
  if (msgUI.edit) refreshEditor();
}
function sendMsg(k, text){
  let p = audParts();
  if (k === 'b1' && p.aud !== 'lead') p = { aud: 'leads', to: null };
  upd({ msg: { id: 'm' + Date.now().toString(36) + Math.floor(Math.random() * 1296).toString(36), k: k || null, text: k ? '' : text, aud: p.aud, to: p.to, at: Math.round(now()) } });
  msgUI.last = tr('msgSent', { a: audLabel(p.aud, p.to), m: k ? tr(k === 'b1' ? 'msgB1' : 'msgB2') : text });
  renderMsg();
}
/* Admin actions added in this update. Returns true when it handled the tap. */
function adminExtra(a, b){
  if (a === 'msend'){
    const t = $('mTxt').value.trim().slice(0, 40);
    if (!t){ note(tr('msgEmpty')); return true; }
    sendMsg(null, t); $('mTxt').value = ''; return true;
  }
  if (a === 'mb' && b.dataset.k === 'b3'){
    const names = mostHelped();
    if (!names.length){ note(tr('noHelpYet')); return true; }
    const msg = { id: 'm' + Date.now().toString(36), k: 'b3', text: '', names: names, aud: 'all', to: null, at: Math.round(now()) };
    upd({ msg: msg }); msgUI.last = tr('msgSent', { a: tr('audAll'), m: msgText(msg) }); renderMsg(); return true;
  }
  if (a === 'mb'){ sendMsg(b.dataset.k); return true; }
  if (a === 'mp'){ const p = presetsNow()[+b.dataset.i]; if (p && p.t) sendMsg(null, p.t); return true; }
  if (a === 'vb'){
    const i = +b.dataset.i, p = audParts();
    upd({ vox: { id: 'x' + Date.now().toString(36), slot: i, aud: p.aud, to: p.to, at: Math.round(now()) } });
    msgUI.last = tr('voiceSent', { a: audLabel(p.aud, p.to), m: vlabelsNow()[i] || tr('voiceN', { n: i + 1 }) });
    renderMsg(); return true;
  }
  if (a === 'medit'){ msgUI.edit = !msgUI.edit; renderMsg(); renderAdmin(); return true; }
  if (a === 'msave'){
    const P = [0, 1, 2, 3, 4, 5].map(i => ({ l: $('pl' + i).value.trim().slice(0, 12), t: $('pt' + i).value.trim().slice(0, 40) }));
    const VL = [0, 1, 2, 3, 4, 5].map(i => $('vl' + i).value.trim().slice(0, 12));
    upd({ presets: P, vlabels: VL }); note(tr('presetsSaved')); return true;
  }
  if (a === 'cplay'){ ensureAudio(); Promise.all([loadClips(), loadVoices()]).then(() => { if (!playClip(b.dataset.c)) note(tr('noClip')); }); return true; }
  if (a === 'vdel'){
    const i = +b.dataset.i;
    if (!(D.vclip || {})['v' + i] || !confirm(tr('clipDelQ'))) return true;
    deleteDoc(voiceRef(i)).catch(fail); upd({ ['vclip.v' + i]: deleteField() }); delete CLIP.buf['v' + i]; delete CLIP.vver['v' + i];
    return true;
  }
  return false;
}
adminSec.addEventListener('change', e => {
  if (e.target.id === 'mAud'){ msgUI.aud = e.target.value; }
  if (e.target.id === 'mFilt'){ msgUI.sig = ''; renderMsg(); }
  if (e.target.dataset && e.target.dataset.vg != null){
    const i = +e.target.dataset.vg, g = +e.target.value, id = 'v' + i;
    if (!hasControl() || !(D && D.vclip && D.vclip[id])) return;
    if (CLIP.raw[id]) setVoice(id, CLIP.raw[id], g);
    upd({ ['vclip.' + id + '.g']: g }); playClip(id); /* everyone's devices follow; the admin hears the new level */
  }
  if (e.target.dataset && e.target.dataset.up != null && hasControl()){ const f = e.target.files && e.target.files[0]; uploadVoice(+e.target.dataset.up, f).then(() => { refreshEditor(); renderAdmin(); }); e.target.value = ''; }
});
adminSec.addEventListener('keyup', e => { if (e.target.id === 'mFilt'){ msgUI.sig = ''; renderMsg(); } });
adminSec.addEventListener('keydown', e => { if (e.target.id === 'mTxt' && e.key === 'Enter'){ const b = adminSec.querySelector('[data-a="msend"]'); if (b && !b.disabled) b.click(); } });



/* ---------- subscriptions ----------
   Everyone listens to the room (admin state) and to the leads. A lead also listens to their own joiners.
   Admins listen to all players. Joiners and defenders writing their own documents reach only the admins and their lead. */
function onRoom(){
  TARGETS.forEach(T => {
    const h = !!TG(T).held;
    if (prevHeld[T] === false && h && !(prof.tgt === T && prof.role === 'def')) localMsg(tr('nowDef', { t: tn(T) }));
    prevHeld[T] = h;
  });
  /* an admin's march correction becomes this lead's default march for the target */
  if (prof.role === 'lead' && prof.tgt){
    const ov = (TG(prof.tgt).ov || {})[pid], rt = rallyOf(pid);
    if (ov && ov.mo && rt && ov.mo.at >= rt.S - 5000 && prof.mar[prof.tgt] !== ov.mo.m && !(prof.mo && prof.mo.at > ov.mo.at)){
      const mar = Object.assign({}, prof.mar); mar[prof.tgt] = ov.mo.m; setMe({ mar: mar });
    }
  }
  checkReset(); onMsg(); loadVoices(); checkVersion();
  if (isAdmin){ adminAuto(); renderAdmin(); }
  tick();
}
function subscribe(){
  if (unsub) unsub(); D = null; live = false; invalidate();
  TARGETS.forEach(T => { delete prevHeld[T]; });
  ensureRoom().catch(fail);
  unsub = onSnapshot(roomRef(), s => {
    if (!s.exists()){ ensureRoom().catch(fail); return; }
    live = true; netState = 'live'; refreshStatic();
    D = s.data(); onRoom();
  }, e => { live = false; netState = 'off'; refreshStatic(); fail(e); });
}
function fillMap(map, s){ map.clear(); s.forEach(d => { if (d.id !== pid) map.set(d.id, d.data()); }); }
function startLeads(){
  if (leadsUnsub) leadsUnsub();
  leadsUnsub = onSnapshot(query(playersCol(), where('role', '==', 'lead')), s => { fillMap(LEADS, s); if (isAdmin){ adminAuto(); renderAdmin(); } tick(); }, fail);
}
function syncMyJoiners(){
  const want = prof.role === 'lead' && !isAdmin && pid ? pid : null;
  if (want === myjFor) return;
  if (myjUnsub){ myjUnsub(); myjUnsub = null; } MYJ.clear(); myjFor = want;
  if (want) myjUnsub = onSnapshot(query(playersCol(), where('rally', '==', want)), s => { fillMap(MYJ, s); tick(); }, fail);
}
function startPlayers(){
  if (plUnsub) plUnsub();
  plUnsub = onSnapshot(playersCol(), s => { fillMap(PL, s); adminAuto(); renderAdmin(); tick(); }, fail);
}
function stopPlayers(){ if (plUnsub){ plUnsub(); plUnsub = null; } PL.clear(); }
/* A joiner follows their lead's own document, so a solo win is seen even after the lead moves to defense. */
function syncMyLead(){
  const want = prof.role === 'join' && prof.rally && pid ? prof.rally : null;
  if (want === mylFor) return;
  if (mylUnsub){ mylUnsub(); mylUnsub = null; } MYLEAD.clear(); mylFor = want;
  if (want) mylUnsub = onSnapshot(doc(db, 'rooms', roomKey, 'players', want), s => { MYLEAD.clear(); if (s.exists()) MYLEAD.set(want, s.data()); tick(); }, fail);
}
/* A lead follows their own document so a helping admin's sync and march fixes reach this device. */
let selfUnsub = null, selfFor = null;
function syncSelf(){
  const want = prof.role === 'lead' && pid ? pid : null;
  if (want === selfFor) return;
  if (selfUnsub){ selfUnsub(); selfUnsub = null; } selfFor = want; helpBy = null;
  if (want) selfUnsub = onSnapshot(meRef(), s => {
    const d = s.exists() ? s.data() : {}, ch = {};
    const was = helpBy && helpBy.uid; helpBy = d.helpBy || null;
    if (helpBy && helpBy.uid !== was) localMsg(tr('helpNote', { n: helpBy.name || '?' }));
    if (!helpBy && was && !d.helpReq && prof.helpReq) ch.helpReq = 0;
    if (d.gs && (!prof.gs || d.gs.at > prof.gs.at)) ch.gs = d.gs;
    if (d.mo && (!prof.mo || d.mo.at > prof.mo.at)){ ch.mo = d.mo; const mar = Object.assign({}, prof.mar); if (prof.tgt) mar[prof.tgt] = d.mo.m; ch.mar = mar; }
    if (Object.keys(ch).length){ Object.assign(prof, ch); saveProf(); invalidate(); if (ch.mar) pushMe(); }
    tick();
  }, fail);
}
setInterval(() => { syncMyJoiners(); syncMyLead(); syncSelf(); }, 1000);
/* Every live feed is paused before an account switch (login, logout) and restarted after it, so none is left dead. */
function stopFeeds(){
  switching = true;
  if (unsub){ unsub(); unsub = null; } if (leadsUnsub){ leadsUnsub(); leadsUnsub = null; }
  if (myjUnsub){ myjUnsub(); myjUnsub = null; } if (mylUnsub){ mylUnsub(); mylUnsub = null; } if (selfUnsub){ selfUnsub(); selfUnsub = null; }
  myjFor = 'x'; mylFor = 'x'; selfFor = 'x';
}
function restartListeners(){ switching = false; myjFor = 'x'; mylFor = 'x'; selfFor = 'x'; subscribe(); syncMyJoiners(); syncMyLead(); syncSelf(); startLeads(); }

/* ---------- pop-out, wake lock ---------- */
function primeVideo(){ try { tick(); if (!vid.srcObject) vid.srcObject = cv.captureStream(10); vid.play().catch(() => {}); } catch (e) {} }
primeVideo(); document.addEventListener('pointerdown', primeVideo, { once: true });
let popWin = null;
/* Grow the desktop pop-out when the box gains buttons (nudges, Sync), so nothing is cut off. */
function fitPop(){
  const pw = popWin; if (!pw) return;
  requestAnimationFrame(() => { try {
    const need = box.offsetHeight + 16, have = pw.innerHeight;
    if (need > have || need < have - 80) pw.resizeBy(0, Math.max(need, 200) - have);
  } catch (e) {} });
}
/* Compact view: only the box, larger, for a phone's floating browser window or split screen. */
let compact = false;
try { compact = localStorage.getItem('tacsync_compact') === '1'; } catch (e) {}
const cpStyle = document.createElement('style');
cpStyle.textContent = 'body.compact main>*:not(#boxSlot):not(#msgBar):not(#note):not(#popRow){display:none!important}' +
  'body.compact main{padding:4px}body.compact #pop{display:none}body.compact .box{min-height:150px}body.compact .box .t{font-size:52px}body.compact .box .l{font-size:15px}' +
  'body.compact .box .ctrl button{min-height:44px;font-size:16px;padding:6px 12px}body.compact #popRow{margin-top:4px}';
document.head.append(cpStyle);
function applyCompact(){
  document.body.classList.toggle('compact', compact);
  $('compact').textContent = tr(compact ? 'fullBtn' : 'compactBtn');
  lastKey = ''; try { tick(); } catch (e) {}
}
$('compact').onclick = () => { compact = !compact; try { localStorage.setItem('tacsync_compact', compact ? '1' : '0'); } catch (e) {} applyCompact(); window.scrollTo(0, 0); };
applyCompact();
function openPop(){
  if ('documentPictureInPicture' in window){
    documentPictureInPicture.requestWindow({ width: 360, height: Math.max(230, box.offsetHeight + 24) }).then(pw => {
      popWin = pw;
      const st = pw.document.createElement('style');
      st.textContent = Array.from(document.querySelectorAll('style')).map(s => s.textContent).join('\n') + 'body{margin:0;padding:6px;background:#0d1117;color:#e6edf3;font:14px system-ui,sans-serif}';
      pw.document.head.append(st);
      popSkinStyle = pw.document.createElement('style'); popSkinStyle.textContent = skinStyle.textContent; pw.document.head.append(popSkinStyle);
      pw.document.documentElement.dir = document.documentElement.dir; pw.document.documentElement.lang = lang;
      pw.document.body.append(box); popped = true;
      pw.addEventListener('pagehide', () => { popped = false; popWin = null; popSkinStyle = null; $('boxSlot').append(box); lastKey = ''; tick(); });
      lastKey = ''; tick(); fitPop();
    }).catch(e => note(tr('notePopRef', { m: e.message })));
    return;
  }
  if (vid.paused) primeVideo();
  try {
    if (vid.requestPictureInPicture){
      vid.requestPictureInPicture().catch(e => {
        if (vid.webkitSetPresentationMode){ try { vid.webkitSetPresentationMode('picture-in-picture'); return; } catch (x) {} }
        note(tr('notePopTap', { m: e.message }));
      });
    } else if (vid.webkitSetPresentationMode) vid.webkitSetPresentationMode('picture-in-picture');
    else note(tr('notePopNone'));
  } catch (e) { note(tr('notePopTap', { m: e.message })); }
}
$('pop').onclick = openPop;
$('wake').onclick = async () => {
  if (wake && !wake.released){ const w = wake; wake = null; try { await w.release(); } catch (e) {} refreshStatic(); return; }
  if (!('wakeLock' in navigator)) return note(tr('noteWakeNo'));
  try { wake = await navigator.wakeLock.request('screen'); refreshStatic(); note(tr('wakeOk')); wake.addEventListener('release', refreshStatic); }
  catch (e) { note(tr('noteWakeRef', { m: e.message })); }
};
document.addEventListener('visibilitychange', async () => {
  if (wake && wake.released && document.visibilityState === 'visible'){ try { wake = await navigator.wakeLock.request('screen'); refreshStatic(); } catch (e) {} }
});



/* ---------- version and problem reports ---------- */
const APP_VER = '2026.11.27';
/* The admin in control records the newest version in the room; anyone on an older copy is asked to refresh. */
const verEl = document.createElement('div'); verEl.className = 'mut'; verEl.style.cssText = 'margin-top:6px;font-size:11px'; verEl.id = 'ver';
$('adminBtn').after(verEl);
const verBar = document.createElement('div'); verBar.id = 'verBar'; verBar.className = 'card'; verBar.hidden = true;
verBar.style.cssText = 'border-color:var(--am);display:flex;gap:8px;align-items:center;justify-content:space-between;font-weight:700';
$('note').after(verBar);
function checkVersion(){
  verEl.textContent = tr('verLbl', { v: APP_VER }); repBtn.textContent = tr('repBtn');
  if (!D) return;
  if (hasControl() && (!D.ver || D.ver < APP_VER)) upd({ ver: APP_VER });
  const newer = !!(D.ver && D.ver > APP_VER);
  if (newer !== !verBar.hidden){
    verBar.hidden = !newer;
    if (newer){ verBar.innerHTML = '<span></span><button class="go mini" id="verGo"></button>'; verBar.querySelector('span').textContent = tr('verNew'); $('verGo').textContent = tr('verRefresh'); $('verGo').onclick = () => location.reload(); }
  }
}
/* The last few errors and notices, kept for a report. */
const LOG = [];
function logEv(kind, msg){ LOG.push({ k: kind, m: String(msg).slice(0, 300), t: Math.round(Date.now()) }); if (LOG.length > 25) LOG.shift(); }
window.addEventListener('error', e => logEv('error', (e.message || '') + ' @' + (e.lineno || '')));
window.addEventListener('unhandledrejection', e => logEv('reject', e.reason && (e.reason.message || e.reason)));
const noteOrig = note;
note = function(msg, keep){ if (msg) logEv('note', msg); return noteOrig(msg, keep); };
/* Report problem: one tap saves what this screen showed and what the app was doing. */
const repBtn = document.createElement('button'); repBtn.className = 'alt mini'; repBtn.id = 'report'; repBtn.style.marginInlineStart = '6px';
$('resetMe').after(repBtn);
function snapshot(text){
  const T = prof.tgt;
  return {
    v: APP_VER, at: Math.round(now()), dev: Math.round(Date.now()), off: Math.round(offset), net: netState, text: String(text || '').slice(0, 500),
    who: { name: prof.name || '', pid: pid || '', admin: !!isAdmin, ctl: hasControl() },
    me: { tgt: T || null, role: prof.role || null, sym: prof.sym || '', mode: prof.mode || null, rally: prof.rally || null, mar: prof.mar || {}, solo: prof.solo || null, gs: prof.gs || null, mo: prof.mo || null },
    box: { cls: box.className, label: lab.textContent, time: tim.textContent, sub: sub.textContent, key: String(lastKey || '') },
    room: T && D && D.tg ? JSON.parse(JSON.stringify(D.tg[T] || {})) : null,
    leads: Array.from(LEADS.values()).slice(0, 12).map(l => ({ n: l.name, sym: l.sym, t: l.target, mode: l.mode, solo: l.solo || null })),
    ua: navigator.userAgent.slice(0, 200), scr: innerWidth + 'x' + innerHeight, popped: !!popped, compact: !!compact, sound: !!soundOn, lang: lang,
    log: LOG.slice(-20)
  };
}
repBtn.onclick = async () => {
  const text = prompt(tr('repQ'));
  if (text === null) return;
  try {
    await setDoc(doc(db, 'rooms', roomKey, 'reports', (pid || 'x') + '_' + Date.now()), snapshot(text));
    note(tr('repSent'));
  } catch (e) { note(tr('repFail'), true); }
};
/* Admins read the reports in the admin panel and copy them to send on. */
let repUnsub = null, REPS = [];
function repSkel(){ return '<div id="aRep"><div class="row tight"><button class="alt mini" data-a="repopen" id="repBtn">' + tr('repHdr') + '</button></div><div id="repList" hidden></div></div>'; }
function renderReps(){
  const el = $('repList'); if (!el || el.hidden) return;
  el.innerHTML = (REPS.length ? '<div class="row tight"><button class="mini go" data-a="repcopy" data-i="all">' + tr('repCopyAll') + '</button><button class="mini alt" data-a="repclear">' + tr('repClear') + '</button></div>' : '<div class="mut">' + tr('repNone') + '</div>') +
    REPS.map((r, i) => '<div class="ln"><b>' + esc(new Date(r.d.dev || r.d.at).toLocaleTimeString()) + '</b> <span>' + esc(r.d.who && r.d.who.name || '?') + '</span> <span class="mut">' + esc((r.d.me && r.d.me.role || '') + ' ' + (r.d.me && r.d.me.tgt || '')) + '</span> <span>' + esc(r.d.text || '') + '</span><button class="mini alt" data-a="repcopy" data-i="' + i + '">' + tr('repCopy') + '</button></div>').join('');
}
function copyText(s){ try { navigator.clipboard.writeText(s).then(() => note(tr('repCopied')), () => prompt(tr('repCopyManual'), s)); } catch (e) { prompt(tr('repCopyManual'), s); } }
adminSec.addEventListener('click', e => {
  const b = e.target.closest('[data-a]'); if (!b || !isAdmin) return;
  const a = b.dataset.a;
  if (a === 'repopen'){
    const el = $('repList'); el.hidden = !el.hidden;
    if (!el.hidden && !repUnsub) repUnsub = onSnapshot(collection(db, 'rooms', roomKey, 'reports'), s => { REPS = []; s.forEach(d => REPS.push({ id: d.id, d: d.data() })); REPS.sort((x, y) => (y.d.at || 0) - (x.d.at || 0)); renderReps(); }, fail);
    else if (el.hidden && repUnsub){ repUnsub(); repUnsub = null; }
    renderReps();
  }
  else if (a === 'repcopy'){ copyText(JSON.stringify(b.dataset.i === 'all' ? REPS.map(r => r.d) : REPS[+b.dataset.i].d, null, 1)); }
  else if (a === 'repclear'){ if (!confirm(tr('repClearQ'))) return; REPS.forEach(r => deleteDoc(doc(db, 'rooms', roomKey, 'reports', r.id)).catch(fail)); }
});

/* ---------- live beta title card ----------
   Shown over the app the first time each new version is opened on a device, and again from "Beta info" at the bottom. */
const BETA_KEY = 'tacsync_beta';
function betaCard(){
  if ($('betaCard')) return;
  const o = document.createElement('div'); o.id = 'betaCard'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true');
  o.style.cssText = 'position:fixed;inset:0;z-index:50;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;padding:14px;overflow:auto';
  o.innerHTML = '<div class="card" style="max-width:440px;width:100%;border:2px solid var(--am);margin:auto">' +
    '<div style="font-size:22px;font-weight:900;color:var(--am);letter-spacing:.5px">' + tr('betaTitle') + '</div>' +
    '<div class="mut" style="margin:2px 0 8px">' + tr('betaSub', { v: APP_VER }) + '</div>' +
    '<div style="border:1px solid var(--am);border-radius:8px;padding:8px;margin:6px 0;font-weight:700">' + tr('betaHelp') + '</div>' +
    '<div style="font-weight:800;margin-top:6px">' + tr('betaNewHdr') + '</div><ul style="margin:4px 0 8px;padding-inline-start:20px">' +
    ['betaN1', 'betaN2', 'betaN3', 'betaN4', 'betaN5'].map(k => '<li>' + tr(k) + '</li>').join('') + '</ul>' +
    '<div style="font-weight:800">' + tr('betaRepHdr') + '</div><ol style="margin:4px 0 8px;padding-inline-start:20px">' +
    ['betaR1', 'betaR2', 'betaR3', 'betaR4'].map(k => '<li>' + tr(k) + '</li>').join('') + '</ol>' +
    '<div style="border:1px solid var(--am);border-radius:8px;padding:8px;margin:8px 0;font-weight:700">' + tr('betaAgree') + '</div>' +
    '<div class="mut" style="margin-bottom:10px">' + tr('betaFoot') + '</div>' +
    '<button class="go" id="betaOk" style="width:100%">' + tr('betaOk') + '</button></div>';
  document.body.append(o);
  $('betaOk').onclick = () => { try { localStorage.setItem(BETA_KEY, APP_VER); } catch (e) {} o.remove(); };
  $('betaOk').focus();
}
const betaLink = document.createElement('button'); betaLink.className = 'link'; betaLink.id = 'betaInfo';
verEl.after(betaLink); betaLink.onclick = betaCard;
function betaBoot(){
  betaLink.textContent = tr('betaLink');
  let seen = ''; try { seen = localStorage.getItem(BETA_KEY) || ''; } catch (e) {}
  if (seen !== APP_VER) betaCard();
}

/* ---------- shared-link tracking ----------
   Each device gets a short code tied to its player, added to the page address (?r=code). Copying or sharing the address
   carries it. A device that opens the app for the first time from a tagged link records whose link it was, and the admin
   sees who brought whom by in-game name. */
function refCode(){ let h = 5381; const s = String(pid || ''); for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0; return h.toString(36).slice(0, 6); }
const REF_IN = (new URLSearchParams(location.search).get('r') || '').replace(/[^a-z0-9]/g, '').slice(0, 8);
let REF_NEW = false; /* first time this device opens the app */
try { REF_NEW = !localStorage.getItem('tacsync_prof2') && !localStorage.getItem('tacsync_rb'); if (REF_NEW) localStorage.setItem('tacsync_rb', REF_IN || '-'); } catch (e) {}
function refBy(){ let r = ''; try { r = localStorage.getItem('tacsync_rb') || ''; } catch (e) {} return r && r !== '-' ? r : ''; }
function refTag(){
  if (!pid) return;
  try {
    const u = new URL(location.href), c = refCode();
    if (u.searchParams.get('r') !== c){ u.searchParams.set('r', c); history.replaceState(null, '', u.toString()); }
  } catch (e) {}
}
function refAdminHtml(){
  const byCode = new Map(), groups = new Map(); let none = 0;
  PL.forEach((p, u) => { if (p.rc) byCode.set(p.rc, p.name || '?'); });
  if (prof.name && pid) byCode.set(refCode(), prof.name);
  PL.forEach(p => { if (p.rb){ if (!groups.has(p.rb)) groups.set(p.rb, []); groups.get(p.rb).push(p.name || '?'); } else none++; });
  const rows = Array.from(groups.entries()).sort((a, b) => b[1].length - a[1].length).map(([c, names]) =>
    '<div class="ln"><b>' + esc(byCode.get(c) || tr('refUnknown', { c: c })) + '</b><span class="mut">' + tr('refLine', { k: names.length }) + '</span><span>' + names.map(esc).join(', ') + '</span></div>').join('');
  return (rows || '<div class="mut">' + tr('refNone') + '</div>') + '<div class="mut">' + tr('refNoTag', { k: none }) + '</div>';
}
function refSkel(){ return '<div id="aRef"><div class="row tight"><button class="alt mini" data-a="refopen">' + tr('refHdr') + '</button></div><div id="refList" hidden></div></div>'; }
adminSec.addEventListener('click', e => {
  const b = e.target.closest('[data-a="refopen"]'); if (!b || !isAdmin) return;
  const el = $('refList'); el.hidden = !el.hidden; if (!el.hidden) el.innerHTML = refAdminHtml();
});
/* Share with a teammate: copies (or shares) the app's address with this player's code, so the admin can see who brought whom.
   Only after the in-game name is saved, so every shared link has a name behind it. */
const shareBtn = document.createElement('button'); shareBtn.className = 'go mini'; shareBtn.id = 'shareBtn'; shareBtn.style.marginInlineStart = '6px';
repBtn.after(shareBtn);
function shareLink(){ const u = new URL(location.origin + location.pathname); u.searchParams.set('r', refCode()); return u.toString(); }
function shareState(){ const ok = profileDone() && !!pid; shareBtn.disabled = !ok; shareBtn.textContent = tr('shareBtn'); shareBtn.title = ok ? '' : tr('shareNeedName'); }
shareBtn.onclick = async () => {
  if (!profileDone() || !pid) return note(tr('shareNeedName'));
  pushMe(); /* make sure the code is stored with the name */
  /* copy straight to the clipboard; the link itself is never shown */
  const url = shareLink();
  try { await navigator.clipboard.writeText(url); return note(tr('shareCopied')); } catch (e) {}
  try {
    const t = document.createElement('textarea'); t.value = url; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
    document.body.append(t); t.select(); t.setSelectionRange(0, url.length); const ok = document.execCommand('copy'); t.remove();
    note(tr(ok ? 'shareCopied' : 'shareFail'));
  } catch (e) { note(tr('shareFail')); }
};
shareBtn.disabled = true; shareState(); setInterval(shareState, 1000);

/* ---------- admin: new battle reset ----------
   Clears every attack, rally, held target, saved enemy, counter and tower claim in the room, and sends every player
   back to entering march times. Names, ratio presets and message buttons are kept. A device that is closed now
   resets the next time it opens. */
function newBattleRoom(){
  const tg = {}; TARGETS.forEach(T => { tg[T] = { held: false, waves: [], enemies: [] }; });
  return { tg: tg, ctr: deleteField(), tdl: {}, tdc: {}, msg: deleteField(), vox: deleteField(), reset: Math.round(now()) };
}
function nbSkel(){ return '<div class="row tight" id="aNb"><button class="rd mini" data-a="nbreset">' + tr('nbBtn') + '</button></div>'; }
adminSec.addEventListener('click', e => {
  const b = e.target.closest('[data-a="nbreset"]'); if (!b) return;
  if (!hasControl()) return note(tr('nbNeedCtl'));
  const w = prompt(tr('nbQ')); if (w === null) return;
  if (w.trim().toUpperCase() !== 'RESET') return note(tr('nbNo'));
  upd(newBattleRoom()); note(tr('nbSent'));
});
/* every device: apply a reset newer than the last one it saw */
function checkReset(){
  if (!D || !D.reset) return;
  let seen = 0; try { seen = +localStorage.getItem('tacsync_reset') || 0; } catch (e) {}
  if (D.reset <= seen) return;
  try { localStorage.setItem('tacsync_reset', String(D.reset)); } catch (e) {}
  if (!prof.name || (!seen && !profileDone())) return; /* a brand-new device has nothing to clear */
  const a = $('askBar'); if (a) a.remove(); holdPush = false;
  prof = Object.assign({}, PROF0, { name: prof.name, mar: {} }); ui.pickT = null; ui.editSym = false; ui.editProf = false; ui.cq = null;
  saveProf(); clearHelpBy(); invalidate(); renderProfile(true);
  if (db && pid) setDoc(meRef(), myDocData()).catch(fail);
  localMsg(tr('nbDone')); tick();
}


/* ---------- counter rally (Center only) ----------
   A DTF player switches to an allied alliance and, when the admin sees a strong enemy attack coming at Center,
   starts a rally from there to land a few seconds after the last enemy attack. The app tells them when to start. */
const isCtr = () => prof.role === 'counter';
const ctrOf = () => (D && D.ctr) || {};
function countersNow(){
  const out = [], src = isAdmin ? PL : new Map();
  src.forEach((p, u) => { if (u !== pid && p.role === 'counter' && fresh(p)) out.push(Object.assign({ uid: u }, p)); });
  if (isCtr()) out.push(pdoc(pid));
  return out;
}
/* the counter attacker's own screen */
function ctrView(t){
  const c = ctrOf(), since = prof.t || 0, rt = rallyOf(pid), m = (prof.mar || {}).C;
  const back = btn('ctrback', tr('ctrBack'), 'alt');
  if (ui.cq === 'sw') return V('cq1:' + lang, { cls: 'warn', label: tr('ctrHdr'), time: tr('ctrSwQ'), sub: tr('ctrSwSub'), ctrl: btn('ctrsw', tr('ctrSwYes'), 'go') + btn('ctrback', tr('soloNo'), 'alt') });
  if (ui.cq === 'bm') return V('cq2:' + lang, { cls: 'warn', label: tr('ctrHdr'), time: tr('ctrBmQ'), sub: tr('ctrBmSub'), ctrl: btn('ctrbm', tr('ctrBmNo'), 'go', 'data-m="0"') + btn('ctrbm', tr('ctrBmYes'), 'alt', 'data-m="1"') });
  if (ui.cq === 'mar') return V('cq3:' + lang, { cls: 'warn', label: tr('ctrHdr'), time: tr('ctrMarQ'), sub: tr('ctrMarSub'),
    ctrl: '<input id="inCm" class="wide" style="width:80px" inputmode="numeric" placeholder="0:42" aria-label="' + esc(tr('ctrMarQ')) + '">' + btn('ctrmar', tr('ok'), 'go') + '<span class="err" id="inErr"></span>' });
  /* after a counter win: hold Center until DTF's marches arrive, then hand it back */
  if (prof.cwon){
    if (c.hand && c.hand > prof.cwon){
      cue('CH' + c.hand, 990, 400, tr('say_ctrHand'), [300, 100, 300], null);
      return V('chand:' + c.hand + lang, { cls: 'go flash', label: tr('ctrHdr'), time: tr('ctrHandT'), sub: tr('ctrHandSub'), ctrl: btn('ctrdone', tr('ctrDone'), 'go') });
    }
    return V('chold:' + lang, { cls: 'go', label: tr('ctrHdr'), time: tr('ctrHoldT'), sub: tr('ctrHoldSub'), ctrl: btn('ctrdone', tr('ctrDone'), 'alt') });
  }
  const abortOn = c.abort && c.abort > (c.go || 0) && c.abort > since;
  if (abortOn && now() - c.abort < 120000 && !(rt && rallyPhase(rt, t) === 'march')){
    cue('CA' + c.abort, 440, 500, tr('say_ctrAbort'), [400, 100, 400], null);
    return V('cab:' + c.abort + lang, { cls: 'warn flash', label: tr('ctrHdr'), time: tr('ctrAbortT'), sub: tr('ctrAbortSub'), ctrl: btn('ctrabok', tr('ok'), 'alt') });
  }
  if (rt && rallyPhase(rt, t) !== 'pre' && !resOf(rt)){
    const rv = rallyView(rt, t, { lead: true, sym: 'CTR', ratio: '' }); if (rv) return rv;
  }
  const goOn = c.go && c.go > since && !abortOn && !(prof.solo && prof.solo.start >= c.go) && now() - c.go < 300000;
  if (goOn){
    cue('CG' + c.go, 990, 500, tr('say_ctrGo'), [400, 100, 400, 100, 400], null);
    return V('cgo:' + c.go + lang, { cls: 'go flash', label: tr('ctrHdr') + ' · ' + tr('ctrGoSub', { s: fmtCount(now() - c.go) }), time: tr('ctrGoT'), sub: tr('ctrGoTap'), ctrl: btn('ctrstart', tr('ctrStarted'), 'go big') });
  }
  return V('cwait:' + lang + m, { label: tr('ctrHdr') + ' · ' + tn('C'), time: tr('standby'), sub: tr('ctrWaitSub', { m: fmtMS(m) }), ctrl: back });
}
function ctrAct(act, b, t){
  if (act === 'ctrsw'){ ui.cq = 'bm'; }
  else if (act === 'ctrbm'){
    const moved = b.dataset.m === '1'; setMe({ cbm: moved });
    ui.cq = moved || !(prof.mar || {}).C ? 'mar' : null;
  }
  else if (act === 'ctrmar'){
    const v = parseMS((b.closest('#box') || box).querySelector('#inCm').value);
    if (v == null || v <= 0) return err(tr('ctrMarErr'));
    const mar = Object.assign({}, prof.mar); mar.C = v; ui.cq = null; setMe({ mar: mar });
  }
  else if (act === 'ctrstart'){ setMe({ mode: 'solo', solo: { start: Math.round(t), ratio: '' }, gs: null, mo: null }); }
  else if (act === 'ctrabok'){ setMe({ solo: null, gs: null, mo: null, t: Math.round(now()) }); }
  else if (act === 'ctrdone' || act === 'ctrback'){ backToDtf(); }
  else return false;
  invalidate(); tick(); return true;
}
/* Back to DTF: the DTF marches come back, or, if the base moved, all five are asked for again. */
function backToDtf(){
  const moved = !!prof.cbm, dm = prof.dmar || prof.mar;
  ui.cq = null; ui.pickT = null;
  setMe({ role: null, tgt: null, mode: null, solo: null, gs: null, mo: null, cwon: null, cbm: null, dmar: null, mar: moved ? {} : Object.assign({}, dm) });
  if (moved){ renderProfile(true); note(tr('ctrNewMar')); }
}
function becomeCounter(){
  const dmar = Object.assign({}, prof.mar);
  assign('C', 'counter').then(() => setMe({ dmar: dmar, mode: 'solo', cwon: null, cbm: null }));
  ui.cq = 'sw'; invalidate(); tick();
}
/* admin: counter attackers and the three buttons, on Center's Defense view */
function ctrAdminHtml(){
  const L = countersNow(), c = ctrOf(), t = now();
  const st = c.hand && c.hand > (c.go || 0) ? tr('ctrStHand', { s: fmtCount(t - c.hand) }) : c.abort && c.abort > (c.go || 0) ? tr('ctrStAbort', { s: fmtCount(t - c.abort) }) : c.go ? tr('ctrStGo', { s: fmtCount(t - c.go) }) : '';
  const names = L.map(p => esc(p.name || '?') + ' ' + fmtMS((p.mar || {}).C) + (p.cwon ? ' ✓' : '') + (rallyOf(p.uid) ? ' · ' + tr('ctrRallying') : '')).join(', ');
  return '<div class="h">' + tr('ctrAdmHdr', { n: L.length }) + '</div><div class="mut">' + (names || tr('ctrNone')) + '</div>' +
    '<div class="row tight"><button class="go mini" data-a="ctrgo"' + (L.length ? '' : ' disabled') + '>' + tr('ctrGoBtn') + '</button><button class="rd mini" data-a="ctrab"' + (c.go ? '' : ' disabled') + '>' + tr('ctrAbBtn') + '</button><button class="alt mini" data-a="ctrhand"' + (L.some(p => p.cwon) || c.go ? '' : ' disabled') + '>' + tr('ctrHandBtn') + '</button><span class="mut" id="ctrSt">' + st + '</span></div>';
}
adminSec.addEventListener('click', e => {
  const b = e.target.closest('[data-a]'); if (!b || !hasControl()) return;
  const a = b.dataset.a, t = Math.round(now());
  if (a === 'ctrgo'){ upd({ 'ctr.go': t }); note(tr('ctrSent')); }
  else if (a === 'ctrab'){ if (confirm(tr('ctrAbQ'))) upd({ 'ctr.abort': t }); }
  else if (a === 'ctrhand'){ upd({ 'ctr.hand': t }); }
  else if (a === 'ctrpick'){
    const p = PL.get(b.dataset.u); if (!p) return;
    bar.ctr = b.dataset.u; $('bName').value = ('CTR ' + (p.name || '')).toUpperCase().slice(0, 12); $('bMar').value = fmtMS((p.mar || {}).C); $('bTim').focus();
  }
});
/* The counter wave follows the counter attacker's own sync and nudges (only they correct it). Runs on the admin in control. */
function ctrRetime(){
  if (!hasControl()) return;
  const W = wavesOf('C'); let ch = false;
  const nw = W.map(w => {
    if (!w.ctr) return w;
    const rt = rallyOf(w.ctr);
    if (rt && rt.synced && Math.abs(rt.land - w.landAt) > 300){ ch = true; return Object.assign({}, w, { landAt: Math.round(rt.land), rallyEnd: Math.round(rt.G), march: (pdoc(w.ctr).mar || {}).C || w.march }); }
    return w;
  });
  if (ch) upd({ 'tg.C.waves': nw });
}


/* ---------- tower defense leads ----------
   The admin picks 1-2 of the strongest rally leads. They rush from tower to tower with single speed-up marches to take over
   as lead defender before each attack lands. The app highlights the next attacks to cover, one per tower, and a claim locks
   an attack so two leaders never go to the same one. */
const TOWERS = ['N', 'W', 'E', 'S'], TDL_MAX = 2, BE_IN = 10000, RELEASE = 5000;
const tdlMap = () => (D && D.tdl) || {};
const isTdl = () => !!(pid && tdlMap()[pid]);
/* every incoming enemy attack on the towers that has not landed (counter waves are not enemies) */
function towerAttacks(t){
  const out = [];
  TOWERS.forEach(T => waveInfo(wavesOf(T).filter(w => !w.ctr)).forEach(w => { if (w.landAt + RELEASE > t) out.push({ T: T, id: w.id, label: w.label, name: w.name, landAt: w.landAt }); }));
  return out.sort((a, b) => a.landAt - b.landAt);
}
/* live claims: the attack still exists and landed less than a few seconds ago */
function liveClaims(t){
  const c = (D && D.tdc) || {}, A = towerAttacks(t), out = {};
  Object.keys(c).forEach(id => { const a = A.find(x => x.id === id); if (a && tdlMap()[c[id].u]) out[id] = Object.assign({ a: a }, c[id]); });
  return out;
}
/* Highlight the next attacks to land, one per tower leader without a claim, never two on one tower or on a claimed tower. */
function tdlHighlights(t){
  const A = towerAttacks(t).filter(a => a.landAt > t), C = liveClaims(t), mine = Object.keys(C).map(k => C[k].u);
  const free = Object.keys(tdlMap()).filter(u => !mine.includes(u)).length;
  const covered = new Set(Object.keys(C).map(k => C[k].a.T)), out = [];
  for (const a of A){ if (out.length >= free) break; if (C[a.id] || covered.has(a.T)) continue; covered.add(a.T); out.push(a.id); }
  return out;
}
function myClaim(t){ const C = liveClaims(t); const k = Object.keys(C).find(id => C[id].u === pid); return k ? C[k] : null; }
async function tdlClaim(id){
  try {
    await runTransaction(db, async tx => {
      const s = await tx.get(roomRef()), d = s.data() || {}, c = Object.assign({}, d.tdc || {}), t = now();
      if (c[id] && c[id].u !== pid) throw new Error('taken');
      Object.keys(c).forEach(k => { if (c[k].u === pid || c[k].at < t - 3600000) delete c[k]; });
      c[id] = { u: pid, n: prof.name || '?', at: Math.round(t) };
      tx.update(roomRef(), { tdc: c });
    });
    beep(880, 150);
  } catch (e){ if (e.message === 'taken') note(tr('tdlTaken')); else fail(e); }
}
function tdlDrop(){ const c = Object.assign({}, (D && D.tdc) || {}); Object.keys(c).forEach(k => { if (c[k].u === pid) delete c[k]; }); updateDoc(roomRef(), { tdc: c }).catch(fail); }
/* The leader's own screen: the claimed attack's two countdowns, then the list of attacks to pick from. */
let tdlWas = null;
function tdlView(t){
  const cl = myClaim(t), A = towerAttacks(t).filter(a => a.landAt > t), hl = tdlHighlights(t), C = liveClaims(t);
  /* a claim whose attack the admin deleted ends with a notice */
  if (tdlWas && !cl){ const gone = !towerAttacks(t).some(a => a.id === tdlWas.id); if (gone) localMsg(tr('tdlGone', { t: tn(tdlWas.T) })); }
  tdlWas = cl ? { id: cl.a.id, T: cl.a.T } : null;
  const list = A.slice(0, 8).map(a => {
    const c = C[a.id], h = hl.includes(a.id), txt = tn(a.T) + ' · ' + a.label + ' ' + esc(a.name) + ' · ' + fmtCount(a.landAt - t);
    if (c) return btn('tdlx', txt + ' · ' + esc(c.n || '?'), c.u === pid ? 'rd' : 'alt', 'disabled');
    return btn('tdlpick', txt, h ? 'go' : 'alt', 'data-id="' + a.id + '"' + (h && !cl ? '' : ' disabled'));
  }).join('');
  if (cl){
    const land = cl.a.landAt - t, beIn = land - BE_IN;
    if (beIn <= 0) cue('TB' + cl.a.id, 990, 300, tr('say_tdlIn'), [200, 80, 200], null);
    return V('tdlc:' + cl.a.id + ':' + (land < 5000 ? 2 : beIn <= 0 ? 1 : 0) + lang, { cls: land < 5000 ? 'warn flash' : beIn <= 0 ? 'warn' : 'run',
      label: tr('tdlHdr') + ' · ' + tn(cl.a.T) + ' · ' + cl.a.label + ' ' + esc(cl.a.name), time: beIn > 0 ? fmtCount(beIn) : fmtCount(Math.max(0, land)),
      sub: beIn > 0 ? tr('tdlBeIn', { l: fmtCount(land) }) : tr('tdlLands'), ctrl: btn('tdldrop', tr('tdlDrop'), 'alt') });
  }
  return V('tdl:' + lang + A.map(a => a.id + (C[a.id] ? C[a.id].u : '') + (hl.includes(a.id) ? 'h' : '') + Math.floor((a.landAt - t) / 1000)).join(','), { label: tr('tdlHdr'),
    time: A.length ? tr('tdlPick') : tr('standby'), sub: A.length ? tr('tdlPickSub') : tr('noIncoming'), ctrl: list || '' });
}
function tdlAct(act, b){
  if (act === 'tdlpick'){ tdlClaim(b.dataset.id); return true; }
  if (act === 'tdldrop'){ tdlDrop(); return true; }
  return false;
}
/* Picked or removed by the admin: a notice with voice, and the player's old role is put aside. */
let tdlOn = false;
function tdlWatch(){
  const on = isTdl();
  if (on !== tdlOn){
    tdlOn = on;
    if (on){ cue('TD' + (tdlMap()[pid].at || 0), 880, 300, tr('say_tdl'), [300, 100, 300], null); localMsg(tr('tdlYou')); if (prof.role !== 'tdl') setMe({ role: 'tdl', tgt: null, mode: null, solo: null, rally: null, gs: null, mo: null }); }
    else if (prof.role === 'tdl'){ localMsg(tr('tdlOff')); setMe({ role: null, tgt: null }); }
  }
}
/* map badges for a leader: attacks coming and the next landing on each tower */
function tdlTile(T, t){
  if (!isTdl() || !TOWERS.includes(T)) return { cls: '', h: '' };
  const A = towerAttacks(t).filter(a => a.T === T && a.landAt > t), hl = tdlHighlights(t), cl = myClaim(t);
  if (!A.length) return { cls: '', h: '' };
  return { cls: cl && cl.a.T === T ? ' mine' : A.some(a => hl.includes(a.id)) ? ' hl' : '', h: '<span class="bdg">⚔ ' + A.length + ' · ' + fmtCount(A[0].landAt - t) + '</span>' };
}
/* admin: pick tower defense leads from the rally leads */
function tdlAdminHtml(){
  const M = tdlMap(), ids = Object.keys(M), cands = [];
  PL.forEach((p, u) => { if (p.role === 'lead' && fresh(p) && !M[u]) cands.push({ u: u, n: p.name || '?', s: p.sym || '' }); });
  return '<div class="h">' + tr('tdlAdmHdr', { n: ids.length, m: TDL_MAX }) + '</div><div class="row tight">' +
    ids.map(u => '<span class="chip"><b>' + esc(M[u].n || '?') + '</b><button class="mini alt" data-a="tdlrm" data-u="' + u + '" aria-label="' + esc(tr('delBtn')) + '">✕</button></span>').join('') +
    (ids.length < TDL_MAX ? (cands.length ? cands.map(c => '<button class="mini alt" data-a="tdladd" data-u="' + c.u + '">+ ' + esc(c.s) + ' ' + esc(c.n) + '</button>').join('') : '<span class="mut">' + tr('tdlNoLeads') + '</span>') : '') + '</div>';
}
function tdlSkel(){ return '<div id="aTdl"></div>'; }
adminSec.addEventListener('click', e => {
  const b = e.target.closest('[data-a]'); if (!b || !hasControl()) return;
  const a = b.dataset.a;
  if (a === 'tdladd'){ const p = PL.get(b.dataset.u); if (!p || Object.keys(tdlMap()).length >= TDL_MAX) return; upd({ ['tdl.' + b.dataset.u]: { n: p.name || '?', at: Math.round(now()) } }); }
  else if (a === 'tdlrm'){ upd({ ['tdl.' + b.dataset.u]: deleteField() }); }
});


/* ---------- skins ----------
   A skin is a small file of allowed settings, never page code: six colors, button shape and style, one font from a list,
   and an optional wallpaper picture with how dark it is. Rally and urgency colors (green, yellow, red) never change.
   Skins live on this device only; players share them by sending the file. ?skin=off in the address turns skins off. */
const SKIN_FONTS = {
  system: 'system-ui,"Segoe UI","Noto Sans",sans-serif',
  rounded: '"Nunito","Varela Round","Arial Rounded MT Bold",system-ui,sans-serif',
  serif: 'Georgia,"Noto Serif",serif',
  mono: '"Cascadia Mono","SFMono-Regular",Consolas,monospace',
  condensed: '"Arial Narrow","Roboto Condensed","Helvetica Neue",system-ui,sans-serif'
};
const SKIN_STYLES = ['flat', 'gradient', 'bevel', 'glow', 'storm'];
/* Classic is the original plain look; MAD OPS (steel, electric blue, storm) is the default. */
const SKIN_CLASSIC = { tacsyncSkin: 1, name: 'Classic', colors: { bg: '#0d1117', pan: '#141b27', bd: '#2b374a', tx: '#e6edf3', mu: '#9fb0c3', am: '#f5b301' }, buttons: { radius: 7, style: 'flat' }, font: 'system', wallpaper: '', dim: 60 };
const SKIN_DEF = { tacsyncSkin: 1, name: 'MAD OPS', colors: { bg: '#050b1a', pan: '#0b1730', bd: '#24456f', tx: '#eaf3ff', mu: '#9fbde3', am: '#46b0ff' }, buttons: { radius: 4, style: 'storm' }, font: 'condensed', wallpaper: 'pat:storm', dim: 0 };
const SKINS = [
  SKIN_DEF,
  { tacsyncSkin: 1, name: 'Forge', colors: { bg: '#0f0907', pan: '#1c120e', bd: '#5a3220', tx: '#fbefe6', mu: '#d6b3a0', am: '#ff8a3d' }, buttons: { radius: 3, style: 'bevel' }, font: 'condensed', wallpaper: 'pat:embers', dim: 0 },
  { tacsyncSkin: 1, name: 'Arctic', colors: { bg: '#061519', pan: '#0c242a', bd: '#2c5961', tx: '#eefcff', mu: '#a7d6dd', am: '#7ef0e4' }, buttons: { radius: 14, style: 'glow' }, font: 'rounded', wallpaper: 'pat:ice', dim: 0 },
  SKIN_CLASSIC
];
/* built-in wallpapers are drawn with CSS, so the app carries no picture files for them */
const SKIN_PATS = {
  storm: 'radial-gradient(ellipse at 12% -5%,rgba(70,176,255,.45),transparent 42%),radial-gradient(ellipse at 90% 0%,rgba(70,176,255,.35),transparent 38%),radial-gradient(ellipse at 50% 115%,rgba(20,100,255,.45),transparent 55%),linear-gradient(115deg,transparent 46%,rgba(140,210,255,.12) 47%,transparent 48.5%),repeating-linear-gradient(0deg,rgba(70,176,255,.05) 0 1px,transparent 1px 34px),repeating-linear-gradient(90deg,rgba(70,176,255,.05) 0 1px,transparent 1px 34px),#050b1a',
  embers: 'radial-gradient(ellipse at 50% 120%,rgba(255,110,40,.45),transparent 55%),radial-gradient(circle at 15% 30%,rgba(255,140,60,.12),transparent 25%),radial-gradient(circle at 85% 60%,rgba(255,90,30,.10),transparent 25%),#0f0907',
  ice: 'radial-gradient(ellipse at 50% -10%,rgba(126,240,228,.30),transparent 50%),linear-gradient(160deg,transparent 60%,rgba(126,240,228,.07) 60.5%,transparent 70%),linear-gradient(20deg,transparent 30%,rgba(255,255,255,.05) 30.5%,transparent 40%),#061519'
};
const skinOff = /(^|[?&])skin=off(&|$)/.test(location.search);
let skin = SKIN_DEF, skinStyle = document.createElement('style'); skinStyle.id = 'skinCss'; document.head.append(skinStyle);
let popSkinStyle = null;
/* contrast ratio of two #rrggbb colors */
function lum(h){ const v = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; }
function contrast(a, b){ const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
const HEX = /^#[0-9a-fA-F]{6}$/;
/* Check a skin and return it cleaned, or a list of problems. Anything unknown is dropped. */
function checkSkin(o){
  const bad = [];
  if (!o || typeof o !== 'object' || o.tacsyncSkin !== 1) return { bad: [tr('skErrFile')] };
  const c = o.colors || {}, out = { tacsyncSkin: 1, name: String(o.name || 'My skin').replace(/[<>]/g, '').slice(0, 24), colors: {}, buttons: {}, font: 'system', wallpaper: '', dim: 60 };
  ['bg', 'pan', 'bd', 'tx', 'mu', 'am'].forEach(k => { if (HEX.test(c[k] || '')) out.colors[k] = c[k].toLowerCase(); else bad.push(tr('skErrColor', { k: k })); });
  const b = o.buttons || {};
  out.buttons.radius = Math.max(0, Math.min(24, Math.round(+b.radius || 0)));
  out.buttons.style = SKIN_STYLES.includes(b.style) ? b.style : 'flat';
  out.font = SKIN_FONTS[o.font] ? o.font : 'system';
  out.dim = Math.max(0, Math.min(90, Math.round(+o.dim || 0)));
  const w = String(o.wallpaper || '');
  if (/^pat:(storm|embers|ice)$/.test(w) || /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(w)) out.wallpaper = w;
  else if (w) bad.push(tr('skErrWall'));
  if (!bad.length){
    const C = out.colors;
    if (contrast(C.tx, C.pan) < 4.5) bad.push(tr('skErrCon', { a: tr('skTx'), b: tr('skPan') }));
    if (contrast(C.tx, C.bg) < 4.5) bad.push(tr('skErrCon', { a: tr('skTx'), b: tr('skBg') }));
    if (contrast(C.mu, C.pan) < 3) bad.push(tr('skErrCon', { a: tr('skMu'), b: tr('skPan') }));
    if (contrast(C.am, '#1a1300') < 4.5) bad.push(tr('skErrAm'));
    if (contrast(C.am, C.pan) < 1.8) bad.push(tr('skErrCon', { a: tr('skAm'), b: tr('skPan') }));
  }
  return bad.length ? { bad: bad } : { skin: out };
}
function skinCss(s){
  const C = s.colors, r = s.buttons.radius, st = s.buttons.style, wp = s.wallpaper;
  const wall = wp ? (wp.indexOf('pat:') === 0 ? SKIN_PATS[wp.slice(4)] : 'url("' + wp + '") center/cover fixed') : '';
  const veil = 'rgba(0,0,0,' + (s.dim / 100).toFixed(2) + ')';
  let css = ':root{--bg:' + C.bg + ';--pan:' + C.pan + ';--bd:' + C.bd + ';--tx:' + C.tx + ';--mu:' + C.mu + ';--am:' + C.am + '}' +
    'body{font-family:' + SKIN_FONTS[s.font] + '}button{border-radius:' + r + 'px;font-family:inherit}.box,.card{border-radius:' + Math.max(4, r + 3) + 'px}';
  if (wall) css += 'body{background:linear-gradient(' + veil + ',' + veil + '),' + wall + ';background-attachment:fixed}.card,.box:not(.go){background-color:' + C.pan + 'ee}';
  if (st === 'gradient') css += 'button{background-image:linear-gradient(rgba(255,255,255,.22),rgba(0,0,0,.18))}';
  if (st === 'bevel') css += 'button{box-shadow:inset 0 1px 0 rgba(255,255,255,.35),inset 0 -2px 0 rgba(0,0,0,.35),0 1px 2px rgba(0,0,0,.5)}';
  if (st === 'storm') css += 'button{background-image:linear-gradient(rgba(255,255,255,.28),rgba(255,255,255,0) 45%,rgba(0,0,0,.25));box-shadow:inset 0 1px 0 rgba(255,255,255,.45),inset 0 -2px 0 rgba(0,0,0,.4)}button.go,button:not(.alt):not(.rd){box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 0 10px ' + C.am + '77}.box{box-shadow:0 0 16px ' + C.am + '40}.box.run .t,.tm{text-shadow:0 0 10px ' + C.am + '99}';
  if (st === 'glow') css += 'button:not(:disabled){box-shadow:0 0 8px ' + C.am + '88}.box{box-shadow:0 0 14px ' + C.am + '33}';
  return css;
}
/* The MAD OPS logo is electric blue (hue about 215); for other skins it is turned to the skin's accent color.
   The silver letters stay silver. */
function hueOf(h){ const r = parseInt(h.slice(1, 3), 16) / 255, g = parseInt(h.slice(3, 5), 16) / 255, b = parseInt(h.slice(5, 7), 16) / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  if (!d) return { h: 215, s: 0 }; let x = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; x *= 60; if (x < 0) x += 360; return { h: x, s: d / (1 - Math.abs(mx + mn - 1) || 1) }; }
function brandCss(s){
  if (s === SKIN_DEF) return '';
  const a = hueOf(s.colors.am), rot = Math.round(((a.h - 215) % 360 + 540) % 360 - 180), sat = a.s < 0.25 ? 0.15 : 1;
  return '#brand{filter:hue-rotate(' + rot + 'deg) saturate(' + sat + ');border-color:' + s.colors.bd + '!important}';
}
function applySkin(s){
  skin = s || SKIN_DEF;
  const css = (skin === SKIN_CLASSIC ? '' : skinCss(skin)) + brandCss(skin);
  skinStyle.textContent = css;
  if (popSkinStyle) popSkinStyle.textContent = css;
  Object.assign(CV, { tx: skin.colors.tx, mu: skin.colors.mu, am: skin.colors.am, bd: skin.colors.bd });
  colors.idle = colors.run = skin.colors.pan;
  try { document.querySelector('meta[name=theme-color]').content = skin.colors.bg; } catch (e) {}
}
function saveSkin(s){ try { if (s === SKIN_DEF) localStorage.removeItem('tacsync_skin'); else localStorage.setItem('tacsync_skin', JSON.stringify(s)); } catch (e) { note(tr('skErrSpace')); } }
(function loadSkin(){
  if (skinOff) return applySkin(SKIN_CLASSIC);
  let s = SKIN_DEF;
  try { const j = localStorage.getItem('tacsync_skin'); if (j){ const o = JSON.parse(j); const b = SKINS.find(x => x.name === o.name && JSON.stringify(x.colors) === JSON.stringify(o.colors)); const r = b ? { skin: b } : checkSkin(o); if (r.skin) s = r.skin; } } catch (e) {}
  applySkin(s);
})();
/* shrink and recompress a picture, which also strips anything that is not a picture */
function shrinkPic(src){
  return new Promise((res, rej) => {
    const im = new Image();
    im.onload = () => {
      const k = Math.min(1, 1280 / Math.max(im.width, im.height)), c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(im.width * k)); c.height = Math.max(1, Math.round(im.height * k));
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
      let q = 0.72, d = c.toDataURL('image/jpeg', q);
      while (d.length > 450000 && q > 0.3){ q -= 0.1; d = c.toDataURL('image/jpeg', q); }
      res(d);
    };
    im.onerror = () => rej(new Error('pic'));
    im.src = src;
  });
}
const readFile = (f, how) => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r[how](f); });
/* ---------- the Skin panel ---------- */
const skinSec = document.createElement('section'); skinSec.className = 'card'; skinSec.id = 'skinSec'; skinSec.hidden = true;
$('me').after(skinSec);
const skinBtn = document.createElement('button'); skinBtn.className = 'alt'; skinBtn.id = 'skinBtn';
$('compact').after(skinBtn);
const skinDefLink = document.createElement('button'); skinDefLink.className = 'link'; skinDefLink.id = 'skinDef';
$('adminBtn').before(skinDefLink); skinDefLink.after(document.createElement('br'));
let skEdit = null;
const AI_PROMPT = () => [
  'Make me a skin file for the MAD OPS app. Reply with only the JSON, no other text.',
  'My idea: [DESCRIBE YOUR THEME HERE, e.g. "dark red prison theme with metal buttons"].',
  'Rules: it must be valid JSON exactly in this shape:',
  '{"tacsyncSkin":1,"name":"<up to 24 letters>","colors":{"bg":"#rrggbb","pan":"#rrggbb","bd":"#rrggbb","tx":"#rrggbb","mu":"#rrggbb","am":"#rrggbb"},"buttons":{"radius":0-24,"style":"flat|gradient|bevel|glow"},"font":"system|rounded|serif|mono|condensed","wallpaper":"","dim":0-90}',
  'bg = page background, pan = panels and boxes, bd = borders and grey buttons, tx = main text, mu = secondary text, am = accent: main buttons and timers.',
  'Keep it readable in battle: tx on pan and on bg needs a contrast ratio of at least 4.5; mu on pan at least 3; am must be light enough that dark text (#1a1300) on it has a contrast of at least 4.5.',
  'Do not use pure green or red as the accent: green, yellow and red are kept for rally and urgency signals.',
  'Leave "wallpaper" empty; I will add a picture in the app. "dim" is how much a wallpaper is darkened (60 is a good start).'
].join('\n');
function skinPanel(){
  const cur = skin, E = skEdit;
  let h = '<div class="h">' + tr('skHdr') + '</div><div class="row tight">' +
    SKINS.map((s, i) => '<button class="mini ' + (cur.name === s.name ? '' : 'alt') + '" data-sk="pick" data-i="' + i + '">' + esc(s.name) + '</button>').join('') +
    '</div><div class="row tight"><label class="mini alt" style="display:inline-flex;align-items:center;gap:4px;padding:4px 9px;border-radius:7px;background:var(--bd);font-size:12px;font-weight:800;cursor:pointer">' + tr('skUpload') + '<input type="file" accept=".json,application/json,.txt" data-sk="file" hidden></label>' +
    '<button class="mini alt" data-sk="edit">' + tr(E ? 'skEditClose' : 'skEdit') + '</button><button class="mini alt" data-sk="ai">' + tr('skAi') + '</button><button class="mini alt" data-sk="dl">' + tr('skDownload') + '</button><button class="mini" data-sk="def">' + tr('skDefault') + '</button></div>' +
    '<div class="mut">' + tr('skNow', { n: esc(cur.name) }) + (skinOff ? ' · ' + tr('skOffNow') : '') + '</div><div id="skErr" class="err" style="color:#ff7b72"></div>';
  if (E){
    h += '<div class="card" style="margin:6px 0"><div class="row tight">' + ['bg', 'pan', 'bd', 'tx', 'mu', 'am'].map(k => '<label class="mut" style="display:inline-flex;align-items:center;gap:3px">' + tr('sk_' + k) + '<input type="color" data-sc="' + k + '" value="' + E.colors[k] + '" style="width:40px;height:30px;padding:0;text-transform:none"></label>').join('') + '</div>' +
      '<div class="row tight"><span class="mut">' + tr('skRadius') + '</span><input type="range" min="0" max="24" data-sb="radius" value="' + E.buttons.radius + '" style="width:110px">' +
      '<select data-sb="style">' + SKIN_STYLES.map(s => '<option' + (E.buttons.style === s ? ' selected' : '') + ' value="' + s + '">' + tr('skSt_' + s) + '</option>').join('') + '</select>' +
      '<select data-sf>' + Object.keys(SKIN_FONTS).map(f => '<option' + (E.font === f ? ' selected' : '') + ' value="' + f + '">' + tr('skF_' + f) + '</option>').join('') + '</select></div>' +
      '<div class="row tight"><label class="mini alt" style="display:inline-flex;align-items:center;padding:4px 9px;border-radius:7px;background:var(--bd);font-size:12px;font-weight:800;cursor:pointer">' + tr('skWall') + '<input type="file" accept="image/*" data-sk="wall" hidden></label>' +
      (E.wallpaper ? '<button class="mini alt" data-sk="nowall">' + tr('skNoWall') + '</button>' : '') +
      '<span class="mut">' + tr('skDim') + '</span><input type="range" min="0" max="90" data-sd value="' + E.dim + '" style="width:100px"></div>' +
      '<div class="row tight"><input class="wide" data-sn maxlength="24" style="text-transform:none;width:150px" value="' + esc(E.name) + '" aria-label="' + esc(tr('skName')) + '"><button class="mini go" data-sk="save">' + tr('skSave') + '</button></div></div>';
  }
  if (ui.skAi) h += '<div class="card" style="margin:6px 0"><div class="mut">' + tr('skAiHow') + '</div><textarea id="skAiTxt" readonly style="width:100%;height:150px;background:#0b0f17;color:var(--tx);border:1px solid var(--bd);border-radius:6px;font:12px monospace">' + esc(AI_PROMPT()) + '</textarea><button class="mini" data-sk="aicopy">' + tr('repCopy') + '</button></div>';
  skinSec.innerHTML = h;
}
function skinErr(list){ const e = $('skErr'); if (e) e.innerHTML = (list || []).map(esc).join('<br>'); }
/* the editor previews live; Save keeps it */
function skPreview(){ const r = checkSkin(skEdit); skinErr(r.bad); if (r.skin) applySkin(r.skin); }
skinBtn.onclick = () => { skinSec.hidden = !skinSec.hidden; if (!skinSec.hidden){ skinPanel(); skinSec.scrollIntoView({ block: 'nearest' }); } };
skinDefLink.onclick = () => { applySkin(SKIN_DEF); saveSkin(SKIN_DEF); skEdit = null; if (!skinSec.hidden) skinPanel(); note(tr('skDefOk')); };
skinSec.addEventListener('click', e => {
  const b = e.target.closest('[data-sk]'); if (!b) return;
  const a = b.dataset.sk;
  if (a === 'pick'){ const s = SKINS[+b.dataset.i]; applySkin(s); saveSkin(s); skEdit = null; skinPanel(); }
  else if (a === 'def'){ skinDefLink.onclick(); }
  else if (a === 'edit'){ skEdit = skEdit ? null : JSON.parse(JSON.stringify(skin)); if (!skEdit){ const j = (() => { try { return JSON.parse(localStorage.getItem('tacsync_skin') || 'null'); } catch (x) { return null; } })(); const r = j && checkSkin(j); applySkin(r && r.skin ? r.skin : SKIN_DEF); } skinPanel(); }
  else if (a === 'ai'){ ui.skAi = !ui.skAi; skinPanel(); }
  else if (a === 'aicopy'){ copyText(AI_PROMPT()); }
  else if (a === 'nowall'){ skEdit.wallpaper = ''; skPreview(); skinPanel(); }
  else if (a === 'save'){ const r = checkSkin(skEdit); if (r.bad) return skinErr(r.bad); applySkin(r.skin); saveSkin(r.skin); skEdit = null; skinPanel(); note(tr('skSaved')); }
  else if (a === 'dl'){
    const s = skEdit ? (checkSkin(skEdit).skin || skin) : skin, url = URL.createObjectURL(new Blob([JSON.stringify(s, null, 1)], { type: 'application/json' }));
    const l = document.createElement('a'); l.href = url; l.download = (s.name || 'skin').replace(/[^A-Za-z0-9 _-]/g, '') + '.madops-skin.json'; document.body.append(l); l.click(); l.remove(); setTimeout(() => URL.revokeObjectURL(url), 5000);
  }
});
skinSec.addEventListener('input', e => {
  if (!skEdit) return;
  const t = e.target;
  if (t.dataset.sc) skEdit.colors[t.dataset.sc] = t.value;
  else if (t.dataset.sb === 'radius') skEdit.buttons.radius = +t.value;
  else if (t.dataset.sd != null) skEdit.dim = +t.value;
  else if (t.dataset.sn != null) skEdit.name = t.value;
  else return;
  skPreview();
});
skinSec.addEventListener('change', async e => {
  const t = e.target;
  if (t.type === 'file') setTimeout(() => { t.value = ''; }, 0); /* the same file can be picked again after a fix */
  if (skEdit && t.dataset.sb === 'style'){ skEdit.buttons.style = t.value; return skPreview(); }
  if (skEdit && t.dataset.sf != null){ skEdit.font = t.value; return skPreview(); }
  if (t.dataset.sk === 'wall' && t.files[0] && skEdit){
    try { skEdit.wallpaper = await shrinkPic(await readFile(t.files[0], 'readAsDataURL')); if (!skEdit.dim) skEdit.dim = 60; skPreview(); skinPanel(); }
    catch (x) { skinErr([tr('skErrWall')]); }
  }
  if (t.dataset.sk === 'file' && t.files[0]){
    try {
      if (t.files[0].size > 2000000) throw new Error('big');
      const o = JSON.parse(await readFile(t.files[0], 'readAsText'));
      if (o && o.wallpaper && /^data:image\//.test(o.wallpaper)) o.wallpaper = await shrinkPic(o.wallpaper);
      const r = checkSkin(o); if (r.bad) return skinErr(r.bad);
      applySkin(r.skin); saveSkin(r.skin); skEdit = null; skinPanel(); note(tr('skLoaded', { n: r.skin.name }));
    } catch (x) { skinErr([tr('skErrFile')]); }
  }
});
function skinLabels(){ skinBtn.textContent = tr('skBtn'); skinDefLink.textContent = tr('skDefault'); }


/* ---------- MAD OPS name and logo ---------- */
document.title = 'MAD OPS';
(function brand(){
  const ban = document.createElement('img'); ban.id = 'brand'; ban.src = BRAND_BANNER; ban.alt = 'MAD OPS · We don’t back down. We strike together.';
  ban.style.cssText = 'display:block;width:100%;max-height:120px;object-fit:cover;border-radius:10px;margin:0 0 8px;border:1px solid #23406e';
  document.querySelector('main').prepend(ban);
  const st = document.createElement('style'); st.textContent = 'body.compact #brand{display:none}'; document.head.append(st);
  let ic = document.querySelector('link[rel=icon]'); if (!ic){ ic = document.createElement('link'); ic.rel = 'icon'; document.head.append(ic); } ic.href = BRAND_ICON;
})();


/* ---------- feature tips ----------
   The first time a player uses a new feature, a short tip slides up from the bottom: what it is and what it is for.
   It never covers the top box with the timers. A ticked "Don't show this again" keeps it away on this device. */
const TIP_KEY = 'tacsync_tips';
function tipsSeen(){ try { return JSON.parse(localStorage.getItem(TIP_KEY) || '{}'); } catch (e) { return {}; } }
let tipQueue = [];
function tip(id){
  if (tipsSeen()[id] || tipQueue.includes(id) || (document.getElementById('betaCard'))) return;
  tipQueue.push(id); if (tipQueue.length === 1) showTip();
}
function showTip(){
  const id = tipQueue[0]; if (!id) return;
  const o = document.createElement('div'); o.id = 'tipCard'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-live', 'polite');
  o.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:40;display:flex;justify-content:center;padding:10px;pointer-events:none';
  o.innerHTML = '<div class="card" style="max-width:460px;width:100%;max-height:45vh;overflow:auto;border:2px solid var(--am);box-shadow:0 -6px 24px rgba(0,0,0,.6);pointer-events:auto;margin:0">' +
    '<div style="font-weight:900;font-size:16px;color:var(--am)">ℹ ' + tr('tip_' + id + '_t') + '</div>' +
    '<div style="margin:6px 0 8px;line-height:1.45">' + tr('tip_' + id) + '</div>' +
    '<div class="row tight" style="justify-content:space-between"><label class="mut" style="display:inline-flex;gap:6px;align-items:center"><input type="checkbox" id="tipNo" checked style="width:auto"> ' + tr('tipNoMore') + '</label>' +
    '<button class="go mini" id="tipOk" style="min-width:70px">' + tr('ok') + '</button></div></div>';
  document.body.append(o);
  $('tipOk').onclick = () => {
    if ($('tipNo').checked){ const s = tipsSeen(); s[id] = 1; try { localStorage.setItem(TIP_KEY, JSON.stringify(s)); } catch (e) {} }
    o.remove(); tipQueue.shift(); if (tipQueue.length) setTimeout(showTip, 300);
  };
}
/* where the tips appear */
let tipLast = {};
function tipWatch(){
  if (!D || !profileDone() || $('betaCard')) return;
  const r = prof.role, k = r + ':' + (prof.mode || '') + ':' + isTdl();
  if (k !== tipLast.role){
    tipLast.role = k;
    if (isTdl()) tip('tdl');
    else if (r === 'lead') tip(prof.mode === 'solo' ? 'solo' : 'lead');
    else if (r === 'join') tip('join');
    else if (r === 'def') tip('def');
    else if (r === 'counter') tip('ctr');
  }
  if (isAdmin && $('aAtk')){
    const v = ui.sub === 'def' ? (mgT() === 'C' ? 'admCtr' : 'admDef') : 'admAtk';
    if (v !== tipLast.adm){ tipLast.adm = v; tip(v); if (v === 'admAtk' && hasControl()) tip('admTdl'); }
  }
}
setInterval(tipWatch, 1000);
/* features opened by a tap */
document.addEventListener('focusin', e => { if (e.target && e.target.dataset && e.target.dataset.rp) tip('ratio'); });
document.addEventListener('click', e => {
  const t = e.target.closest && e.target.closest('#skinBtn,#compact,#pop,#report,[data-a="rpedit"],[data-a="repopen"],[data-me="help"]');
  if (!t) return;
  const m = { skinBtn: 'skin', compact: 'compact', pop: 'pop', report: 'report' };
  tip(m[t.id] || (t.dataset.a === 'rpedit' ? 'admRp' : t.dataset.a === 'repopen' ? 'admRep' : 'help'));
}, true);


/* ---------- admins list kept in the app ----------
   The security rules read config/admins, so an owner adds a new admin here instead of editing the rules.
   The account must still exist in Firebase Authentication (email and password).
   The app holds no addresses itself: it asks Firebase whether this account may act as admin. */
const adminsRef = () => doc(db, 'config', 'admins');
let ADM = { emails: [], owners: [] };
/* Owners are set in the security rules and in this list; Firebase refuses list changes from anyone else. */
async function onAdminList(){
  try { const s = await getDoc(adminsRef()); ADM = s.exists() ? Object.assign({ emails: [], owners: [] }, s.data()) : { emails: [], owners: [] }; }
  catch (e) { ADM = { emails: [], owners: [] }; }
  /* only admins (the built-in list in the rules, or this list) may read the control document */
  try { await getDoc(ctlRef()); return true; } catch (e) { return false; }
}
function admSkel(){ return '<div id="aAdm"></div>'; }
function admHtml(){
  const dyn = (ADM.emails || []).map(e => '<div class="ln"><span>' + esc(e) + '</span>' +
    '<button class="mini ' + ((ADM.owners || []).includes(e) ? '' : 'alt') + '" data-a="admown" data-e="' + esc(e) + '" title="' + esc(tr('admOwnerTip')) + '">★ ' + tr('admOwner') + '</button>' +
    '<button class="mini alt" data-a="admrm" data-e="' + esc(e) + '" aria-label="' + esc(tr('delBtn')) + '">✕</button></div>').join('');
  return '<div class="h">' + tr('admHdr') + '</div><div class="mut">' + tr('admHow') + '</div><div class="mut">' + tr('admFixed') + '</div>' + dyn +
    '<div class="row tight"><input id="admNew" class="wide" style="text-transform:none;width:210px" type="email" placeholder="name@example.com" aria-label="' + esc(tr('admAdd')) + '"><button class="mini go" data-a="admadd">' + tr('admAdd') + '</button></div>';
}
async function saveAdmins(n){ try { await setDoc(adminsRef(), n); ADM = n; setH($('aAdm'), admHtml()); note(tr('admSaved')); } catch (e) { note(tr('admFail'), true); } }
adminSec.addEventListener('click', e => {
  const b = e.target.closest('[data-a]'); if (!b || !isAdmin) return;
  const a = b.dataset.a, n = { emails: (ADM.emails || []).slice(), owners: (ADM.owners || []).slice() };
  if (a === 'admadd'){
    const v = ($('admNew').value || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return note(tr('admBad'));
    if (n.emails.includes(v)) return note(tr('admHave'));
    n.emails.push(v); saveAdmins(n);
  }
  else if (a === 'admrm'){ const v = b.dataset.e; if (!confirm(tr('admRmQ', { e: v }))) return; n.emails = n.emails.filter(x => x !== v); n.owners = n.owners.filter(x => x !== v); saveAdmins(n); }
  else if (a === 'admown'){ const v = b.dataset.e; n.owners = n.owners.includes(v) ? n.owners.filter(x => x !== v) : n.owners.concat([v]); saveAdmins(n); }
});


/* ---------- help ----------
   A Help button at the top opens a plain guide: what MAD OPS is, what a live beta is, how to get started,
   the simple roles and the handy buttons. Nothing in depth: the feature tips cover the details. */
const helpBtn = document.createElement('button'); helpBtn.className = 'mini alt'; helpBtn.id = 'helpBtn';
$('sound').after(helpBtn);
function helpLabels(){ helpBtn.textContent = tr('helpBtn'); }
function helpCard(){
  if ($('helpCard')) return;
  const P = k => '<p style="margin:4px 0 8px;line-height:1.45">' + tr(k) + '</p>';
  const H = k => '<div style="font-weight:800;margin-top:10px;color:var(--am)">' + tr(k) + '</div>';
  const list = (tag, ks) => '<' + tag + ' style="margin:4px 0 8px;padding-inline-start:20px;line-height:1.45">' + ks.map(k => '<li style="margin-bottom:4px">' + tr(k) + '</li>').join('') + '</' + tag + '>';
  const o = document.createElement('div'); o.id = 'helpCard'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true'); o.setAttribute('aria-label', tr('helpTitle'));
  o.style.cssText = 'position:fixed;inset:0;z-index:50;background:rgba(0,0,0,.72);display:flex;align-items:flex-start;justify-content:center;padding:14px;overflow:auto';
  o.innerHTML = '<div class="card" style="max-width:460px;width:100%;border:2px solid var(--am);margin:auto">' +
    '<div class="row tight" style="justify-content:space-between;align-items:center"><div style="font-size:20px;font-weight:900;color:var(--am)">' + tr('helpTitle') + '</div>' +
    '<button class="alt mini" data-h="x">✕ ' + tr('helpClose') + '</button></div>' +
    H('helpWhatH') + P('helpWhat1') + P('helpWhat2') +
    H('helpSyncH') + list('ul', ['helpSync1', 'helpSync2', 'helpSync3', 'helpSync4']) +
    H('helpBetaH') + P('helpBeta1') + P('helpBeta2') +
    H('helpStartH') + list('ol', ['helpS1', 'helpS2', 'helpS3', 'helpS4']) +
    H('helpBoxH') + P('helpBox') +
    H('helpRolesH') + list('ul', ['helpJoin', 'helpDef', 'helpLead']) +
    H('helpBtnsH') + list('ul', ['helpB1', 'helpB2', 'helpB3', 'helpB4']) +
    '<div style="border:1px solid var(--am);border-radius:8px;padding:8px;margin:10px 0;font-weight:700">' + tr('helpAsk') + '</div>' +
    '<div class="row tight" style="justify-content:space-between;gap:8px;flex-wrap:wrap"><button class="alt mini" data-h="tips">' + tr('helpTips') + '</button>' +
    '<button class="go" data-h="x" style="min-width:110px">' + tr('helpClose') + '</button></div></div>';
  document.body.append(o);
  o.addEventListener('click', e => {
    const b = e.target.closest('[data-h]');
    if (!b){ if (e.target === o) o.remove(); return; }
    if (b.dataset.h === 'tips'){ try { localStorage.removeItem(TIP_KEY); } catch (er) {} tipLast = {}; note(tr('helpTipsOk')); }
    o.remove();
  });
  const k = ev => { if (ev.key === 'Escape'){ o.remove(); document.removeEventListener('keydown', k); } };
  document.addEventListener('keydown', k);
  const c = o.querySelector('[data-h="x"]'); if (c) c.focus();
}
helpBtn.onclick = helpCard;
helpLabels();


/* ---------- boot ---------- */
(async function boot(){
  applyLang(); askNewBattle(); renderProfile(true); checkVersion(); betaBoot();
  tick();
  try {
    app = initializeApp(firebaseConfig); auth = getAuth(app); db = getFirestore(app);
    await auth.authStateReady();
    if (!auth.currentUser) await signInAnonymously(auth);
    setIds();
  } catch (e){ netState = 'off'; refreshStatic(); fail(e); return; }
  await syncClock();
  refreshStatic();
  setInterval(syncClock, 1200000);
  subscribe(); startLeads();
  if (profileDone()) pushMe();
  if (auth.currentUser && !auth.currentUser.isAnonymous){
    let nm = prof.name || ''; try { nm = nm || localStorage.getItem('tacsync_aname') || ''; } catch (e) {}
    if (!(await onAdminList())){ loginForm(); const x = $('pwErr'); if (x) x.textContent = tr('notAdmin'); }
    else if (nm) joinAdmin(nm); else loginForm();
  }
})();
