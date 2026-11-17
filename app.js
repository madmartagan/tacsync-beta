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
 profHdr:'YOUR PROFILE', namePh2:'In-game name', nameReq:'Enter your in-game name.', marHdr:'March time to each target', marReq:'Enter all five march times.', tC:'Center', tN:'North', tS:'South', tE:'East', tW:'West', saveProf:'Save', editProf:'Edit profile', profSaved:'Profile saved', pickTarget:'Pick a target on the map', mapHdr:'TARGETS', defBadge:'DEF', chooseAct:'{t} · choose your role', defendAnyway:'Defend anyway', leave:'↺ Leave this target', meLine:'{n} · {t} · {r}', meNone:'{n} · no target', roleLeadSym:'lead {s}', roleJoinOf:'joining {s}', roleDef:'defending', joinedList:'Joined: {n}', nobodyJoined:'No joiners yet', symEntry:'{t} · your 2-letter symbol', groupBtn:'GROUP RALLY', soloBtn:'SOLO RALLY', chooseMode:'{t} · {s} · group or solo?', unregister:'Unregister', grpNotCalled:'Waiting for the admin to call a group', grpReset:'The group was reset', rejoin:'Rejoin group', soloRatio:'{t} · {s} · troop ratio', startBtn:'START', ratioErr:'Enter a troop ratio that adds up to 100.', ratioPh:'Shieldbearers/Bombers/Shooters', troops:'Troops {r}', gathering:'{t} · {s} gathering', gatheringEst:'{t} · {s} gathering (est.)', syncGather:'Sync', gatherPh:'timer', syncedOk:'Synced', estTag:'est.', prepReinforce:'Prepare to reinforce', verifying:'Verifying success', winBtn:'Attack successful', failBtn:'Attack not successful', say_reinforce:'Prepare to reinforce', say_verify:'Verifying success', say_disband:'Rally disbanded', say_defense:'Switching to defense', pickLead:'{t} · pick a rally', noLeadsHere:'No rally leads on {t} yet', joiningSym:'{t} · joining {s}', disbanded:'Rally disbanded', pickAgain:'pick another rally', defending:'{t} · defending', noIncoming:'no incoming attacks yet', nowDef:'{t} is now in defense. If you are not defending, pick another role.', youDef:'You are now defending {t}.', mgTarget:'MANAGE TARGET', myTargetBtn:'My target', subAtk:'Attack', subDef:'Defense', grpHdr:'GROUP RALLY', callGroup:'Call group', endGroup:'End group', endGroupQ:'End the group on {t}? Leads go back to choosing group or solo.', setRatio:'Set', ralliesHdr:'RALLIES ON {t}', noRallies:'No rallies running.', soloTag:'solo', groupTag:'group', ratioOv:'ratio', phGather:'Gathering {x}', phGatherEst:'Gathering {x} (est.)', phMarch:'Marching {x}', phVerify:'Verifying', winQ:'Mark the attack on {t} successful? Everyone in it switches to defense.', failQ:'Mark the attack on {t} not successful?', heldOn:'Held: yes', heldOff:'Held: no', defCount:'{n} defending', audTgt:'Everyone on {t}', audOne:'{n}', audPlayers:'PLAYERS', audFilter:'Filter names', dupMark:'⚠ duplicate', audLeadsGrp:'LEADS', audRallies:'RALLY JOINERS', audGeneral:'GENERAL', marNotOk:'⚠ march not confirmed · watch the game', marNotOkAdm:'⚠ march not confirmed', helpReqBtn:'Request help', helpCancel:'Cancel help', helpWaiting:'Help requested…', helpByLbl:'{n} is helping', helpCallBtn:'HELP: {s} {n} · {t}', helpingBar:'Helping {s} on {t}', helpDone:'Finished helping', helpTaken:'Another admin is already helping.', helpNote:'{n} is helping you', helpRallyWait:'rally not started yet', helpCount:'Your help requests: {n}', msgB3:'Most help requests', suckOne:'{n} sucks the most!', suckTie:'{n} suck!', andWord:' and ', noHelpYet:'Nobody has asked for help yet.', ctlOtherDev:'Control is on your other device', takeHere:'Take control on this device', wakeOk:'The screen will stay on while this page is open. Tap again to turn it off.', changeMode:'↩ group/solo', tutLater:'The tutorial returns in a later update.',
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
 resetDef:'RÉINITIALISER LA DÉFENSE', resetDefConfirm:'Réinitialiser la défense ? Cela efface toutes les attaques et la barre de synchro. Les ennemis connus sont conservés.', forgetAll:'Tout oublier', forgetAllConfirm:'Oublier tous les ennemis connus ?', forgetOne:'Oublier {n}'
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
 resetDef:'REINICIAR DEFENSA', resetDefConfirm:'¿Reiniciar la defensa? Se borran todos los ataques y la barra de sincronización. Se conservan los enemigos conocidos.', forgetAll:'Olvidar todos', forgetAllConfirm:'¿Olvidar todos los enemigos conocidos?', forgetOne:'Olvidar {n}'
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
 resetDef:'إعادة ضبط الدفاع', resetDefConfirm:'إعادة ضبط الدفاع؟ سيُمسح كل الهجمات وشريط المزامنة. يبقى الأعداء المعروفون.', forgetAll:'نسيان الكل', forgetAllConfirm:'هل تريد نسيان كل الأعداء المعروفين؟', forgetOne:'نسيان {n}'
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
 resetDef:'방어 초기화', resetDefConfirm:'방어를 초기화할까요? 모든 공격과 동기화 입력이 지워집니다. 알려진 적은 유지됩니다.', forgetAll:'모두 잊기', forgetAllConfirm:'알려진 적을 모두 잊을까요?', forgetOne:'{n} 잊기'
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
 resetDef:'防衛をリセット', resetDefConfirm:'防衛をリセットしますか？すべての攻撃と同期入力が消えます。既知の敵は残ります。', forgetAll:'すべて忘れる', forgetAllConfirm:'既知の敵をすべて忘れますか？', forgetOne:'{n}を忘れる'
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
  const s = ms / 1000;
  if (s >= 60){ const m = Math.floor(s / 60), r = s - m * 60; return m + ':' + (r < 10 ? '0' : '') + r.toFixed(1); }
  return s.toFixed(1);
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
const CLIP = { buf: {}, state: {}, p: null, vver: {}, vload: {} };
let voiceMode = 'dev', popped = false;
try { if (localStorage.getItem('tacsync_voice') === 'rec') voiceMode = 'rec'; } catch (e) {}
const now = () => Date.now() + offset;
/* One id per device, so one admin account on two devices counts as two players and only one of them holds control. */
const DEV = (() => { let d = ''; try { d = localStorage.getItem('tacsync_dev') || ''; if (!d){ d = Math.random().toString(36).slice(2, 10); localStorage.setItem('tacsync_dev', d); } } catch (e) { d = Math.random().toString(36).slice(2, 10); } return d; })();
function setIds(){ uid = auth.currentUser.uid; pid = auth.currentUser.isAnonymous ? uid : uid + '_' + DEV; }
const roomRef = () => doc(db, 'rooms', roomKey);
const playersCol = () => collection(db, 'rooms', roomKey, 'players');
const meRef = () => doc(db, 'rooms', roomKey, 'players', pid);

function note(msg, keep){ $('note').textContent = msg || ''; if (msg && !keep) setTimeout(() => { if ($('note').textContent === msg) $('note').textContent = ''; }, 6000); }
function fail(e){
  const c = (e && e.code) || '';
  if (c.includes('permission')) note(tr('errRules'), true);
  else if (c.includes('operation-not-allowed') || c.includes('admin-restricted')) note(tr('errAuth'), true);
  else note(tr('errGeneric', { m: e && e.message ? e.message : e }), true);
}
const upd = obj => updateDoc(roomRef(), obj).catch(fail);

/* Write the player's own document from the local profile. */
function myDocData(){
  return { name: prof.name, mar: prof.mar, target: prof.tgt || null, role: prof.role || null, sym: prof.role === 'lead' ? (prof.sym || '') : '',
    mode: prof.role === 'lead' ? (prof.mode || null) : null, rally: prof.role === 'join' ? (prof.rally || null) : null,
    solo: prof.role === 'lead' && prof.mode === 'solo' ? (prof.solo || null) : null, gs: prof.gs || null, mo: prof.mo || null,
    readyAt: prof.readyAt || 0, ep: prof.ep || 0, won: prof.won || null, helpReq: prof.role === 'lead' ? (prof.helpReq || 0) : 0, helps: prof.helps || 0, hb: Math.round(now()), t: prof.t || Math.round(now()) };
}
function pushMe(){
  saveProf();
  if (!db || !pid) return Promise.resolve();
  return setDoc(meRef(), myDocData(), { merge: true }).catch(fail);
}
function setMe(fields){ Object.assign(prof, fields); invalidate(); return pushMe(); }
/* A new assignment replaces the old one. */
function assign(T, role){
  ui.pickT = null; ui.editSym = false;
  const keepSym = prof.sym;
  return setMe({ tgt: T, role: role, sym: keepSym, mode: null, rally: null, solo: null, gs: null, mo: null, readyAt: 0, ep: 0, won: null, helpReq: 0, t: Math.round(now()) }).then(() => clearHelpBy());
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
  $('sound').textContent = tr(soundOn ? 'soundOn' : 'soundOff');
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
  return Object.assign({ on: false, stage: 'lobby', confirmed: false, order: [], off: {}, buffer: 10, cdEnd: 0, plan: null, epoch: 0, rcAt: 0, ratio: '', rOv: {} }, TG(T).grp || {});
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
/* Leads registered in the group on target T, in hit order. */
function groupLeads(T){
  const g = grpOf(T), ord = g.order || [];
  return leadsOn(T).filter(p => p.mode === 'group' && (p.ep || 0) === g.epoch).sort((a, b) => {
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
  const p = pdoc(u); if (!p || p.role !== 'lead' || !p.target) return null;
  const T = p.target, g = grpOf(T), ov = ((TG(T).ov || {})[u]) || {};
  let S = null;
  if (p.mode === 'group'){ if (g.stage === 'countdown' && g.plan && g.plan.launch && g.plan.launch[u] != null && (p.ep || 0) === g.epoch) S = g.plan.launch[u]; }
  else if (p.mode === 'solo' && p.solo && p.solo.start) S = p.solo.start;
  const rt = rallyTimes(S, (p.mar || {})[T], [p.gs, ov.gs], [p.mo, ov.mo]);
  if (rt){ rt.T = T; rt.uid = u; rt.mode = p.mode; }
  return rt;
}
function ratioOf(u){
  const p = pdoc(u); if (!p) return '';
  if (p.mode === 'solo') return (p.solo && p.solo.ratio) || '';
  const g = grpOf(p.target); return (g.rOv && g.rOv[u]) || g.ratio || '';
}
function resOf(rt){ if (!rt) return null; const r = ((TG(rt.T).res || {})[rt.uid]); return r && r.S === rt.S ? r : null; }

/* ---------- clock sync ---------- */
async function syncClock(){
  if (!db || !uid) return;
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
$('sound').onclick = () => {
  if (soundOn){
    soundOn = false;
    try { speechSynthesis.cancel(); } catch (e) {}
    refreshStatic(); return;
  }
  actx = actx || new (window.AudioContext || window.webkitAudioContext)(); actx.resume();
  soundOn = true; beep(660, 150); refreshStatic();
  if (voiceMode === 'rec'){ loadClips().then(() => { if (!playClip('so')) say(tr('say_sound')); }); loadVoices(); }
  else { say(tr('say_sound')); if (isAdmin) loadClips(); }
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
const nudges = who => '<span class="adj">' + [-1, -0.1, 0.1, 1].map(d => '<button class="alt mini" data-act="nudge" data-d="' + d + '">' + (d > 0 ? '+' : '−') + Math.abs(d).toString().replace('0.', '.') + '</button>').join('') + '</span>';

/* The common part of a running rally: gather, march, verify. For the lead and for joiners. */
function rallyView(rt, t, opts){
  const T = rt.T, ph = rallyPhase(rt, t), troops = opts.ratio ? tr('troops', { r: opts.ratio }) : '', sym = esc(opts.sym), id = rt.uid + ':' + rt.S;
  const lead = !!opts.lead, ctl = sync => lead ? (sync ? '<input id="inSync" class="wide" style="width:70px" inputmode="numeric" placeholder="' + esc(tr('gatherPh')) + '">' + btn('gsync', tr('syncGather')) : '') + (rt.synced ? nudges() : '') : '';
  if (ph === 'gather') return V('rg:' + id + rt.synced + lead, { cid: 'G' + id, cls: 'run', label: tr(rt.synced ? 'gathering' : 'gatheringEst', { t: tn(T), s: sym }), time: fmtCount(rt.G - t), sub: troops, ctrl: ctl(true) });
  if (ph === 'march'){
    cue('RF' + id, 600, 200, tr('say_reinforce'), [100], 'rf');
    return V('rm:' + id + rt.synced + lead, { cid: 'M' + id, cls: rt.land - t < 3000 ? 'warn' : 'run', label: tn(T) + ' · ' + tr('prepReinforce'), time: fmtCount(rt.land - t), sub: sym + (troops ? ' · ' + troops : ''), ctrl: ctl(false) });
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
  if (!prof.mode)
    return V('lmode:' + lang, { label: tr('chooseMode', { t: tn(T), s: S }), ctrl: btn('mode', tr('groupBtn'), '', 'data-m="group"') + btn('mode', tr('soloBtn'), 'alt', 'data-m="solo"') + btn('unreg', tr('unregister'), 'alt') });
  const rt = rallyOf(pid), ratio = ratioOf(pid);
  if (prof.won && rt && prof.won.S === rt.S) return V('lwon', { cls: 'go', label: tn(T) + ' · ' + S, time: tr('winBtn'), sub: tr('youDef', { t: tn(T) }) });
  if (rt && rallyPhase(rt, t) !== 'pre' && !resOf(rt)){
    if (prof.mode === 'group' && t < rt.S + 1500 && t >= rt.S) return V('send', { cid: 'L' + rt.S, cls: 'go', label: tn(T) + ' · ' + S, time: tr('send'), sub: ratio ? tr('troops', { r: ratio }) : '', go: true, say: tr('say_send'), clip: 'cs' });
    const rv = rallyView(rt, t, { lead: true, sym: prof.sym, ratio: ratio }); if (rv) return rv;
  }
  const back = btn('mode0', tr('changeMode'), 'alt') + btn('unreg', tr('unregister'), 'alt');
  if (prof.mode === 'solo'){
    return V('lsolo:' + lang, { label: tr('soloRatio', { t: tn(T), s: S }), ctrl: ratioInputs('sr', prof.ratio) + btn('solo-start', tr('startBtn'), 'go') + back + '<span class="err" id="inErr"></span>' });
  }
  /* group */
  const g = grpOf(T), troops = ratio ? tr('troops', { r: ratio }) : '';
  if (!g.on) return V('lg0:' + lang, { label: tn(T) + ' · ' + S, time: tr('wait'), sub: tr('grpNotCalled'), ctrl: back });
  if ((prof.ep || 0) !== g.epoch) return V('lgr:' + g.epoch + lang, { label: tn(T) + ' · ' + S, time: tr('wait'), sub: tr('grpReset'), ctrl: btn('rejoin', tr('rejoin')) + back });
  if (g.stage === 'lobby') return V('lgl:' + g.confirmed + lang, { label: tn(T) + ' · ' + (g.confirmed ? tr('standingBy') : tr('waitingAdmin')), time: g.confirmed ? tr('standby') : tr('wait'), sub: S + ' ' + fmtMS(prof.mar[T]) + (troops ? ' · ' + troops : ''), ctrl: back });
  if (g.stage === 'ready'){
    if (!(prof.readyAt > g.rcAt)) return V('lgready:' + g.rcAt + lang, { label: tn(T) + ' · ' + tr('readyCheck'), sub: troops, ctrl: btn('ready', tr('ready'), 'go big') });
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
  const sym = esc(lead.sym), rt = rallyOf(prof.rally), ratio = ratioOf(prof.rally), troops = ratio ? tr('troops', { r: ratio }) : '';
  if (rt && !resOf(rt)){
    const ph = rallyPhase(rt, t);
    if (ph === 'gather') return V('jgo', { cid: 'J' + rt.S, cls: 'go', label: tn(T) + ' · ' + sym + ' · ' + tr('joinNow'), time: fmtCount(rt.G - t), sub: (rt.synced ? '' : tr('estTag') + ' · ') + (troops || tr('rallyStarted')), go: true, say: tr('say_join'), clip: 'cj' });
    if (ph !== 'pre'){ const rv = rallyView(rt, t, { lead: false, sym: lead.sym, ratio: ratio }); if (rv) return rv; }
  }
  const g = grpOf(T), cd = lead.mode === 'group' && g.stage === 'countdown' && t < g.cdEnd;
  if (cd) return V('jcd', { cid: 'C' + g.cdEnd, cls: 'run', label: tr('joiningSym', { t: tn(T), s: sym }), time: String(Math.ceil((g.cdEnd - t) / 1000)), sub: tr('cdSub'), rem: g.cdEnd - t });
  const st = lead.mode === 'group' && g.stage === 'ready' ? tr('readyQ') : tr('standby');
  return V('jw:' + lang, { label: tr('joiningSym', { t: tn(T), s: sym }), time: st, sub: troops || (lead.mode === 'solo' ? tr('soloTag') : tr('groupTag')), ctrl: btn('jchange', tr('changeBtn'), 'alt') });
}

function defView(t){
  const T = prof.tgt, mar = prof.mar[T];
  const list = launchList(wavesOf(T), mar), st = defState(list, t);
  if (st.kind === 'count'){
    const it = st.item, nx = st.nextGap != null ? tr('thenGap', { s: st.nextGap.toFixed(1) }) : '';
    /* an enemy's march to this target is a 30 s guess until the admin confirms it live */
    const w = wavesOf(T).find(x => x.id === it.id), unsure = w && w.rallyEnd && w.mc === false;
    return V('dc', { cid: 'D' + it.id + ':' + Math.round(it.L), cls: (it.urgent || (st.nextGap != null && st.nextGap <= 1) || st.rem < 3000) ? 'warn' : 'run', label: tn(T) + ' · ' + tr('sendIn', { l: it.label }), time: fmtCount(st.rem), sub: unsure ? tr('marNotOk') : esc(it.name) + nx, cnt: st.left, rem: st.rem });
  }
  if (st.kind === 'send'){
    const it = st.item;
    return V('ds', { cid: 'D' + it.id + ':' + Math.round(it.L), cls: 'go', label: tn(T) + ' · ' + it.label, time: tr('send'), cnt: st.left, go: true, say: tr('say_send'), clip: 'cs' });
  }
  if (st.kind === 'done') return V('ddone', { label: tr('allSent'), time: tr('DONE'), sub: tr('checkRatios'), cls: 'idle' });
  return V('didle:' + lang, { label: tr('defending', { t: tn(T) }), time: tr('standby'), sub: wavesOf(T).length ? tr('marchSub', { t: fmtMS(mar) }) : tr('noIncoming') });
}

function viewNow(){
  if (!D) return V('conn', { label: live ? '' : tr('connecting'), time: '…' });
  if (!profileDone()) return V('prof:' + lang, { label: tr('profHdr'), time: '…', sub: tr('nameReq') });
  const t = now();
  if (ui.pickT) return V('pick:' + ui.pickT + lang, { label: tr('chooseAct', { t: tn(ui.pickT) }), ctrl:
    btn('role-lead', tr('lead')) + btn('role-join', tr('join'), 'alt') + btn('role-def', tr('defendAnyway'), 'alt') + btn('pickx', tr('back'), 'alt') });
  if (!prof.tgt || !prof.role) return V('notgt:' + lang, { label: tr('pickTarget'), time: '…' });
  if (prof.role === 'lead') return leadView(t);
  if (prof.role === 'join') return joinView(t);
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
  g.strokeStyle = v.cls === 'warn' ? '#ef4444' : v.cls === 'go' ? '#22c55e' : '#2b374a';
  g.lineWidth = h * 0.04; g.strokeRect(h * 0.02, h * 0.02, w - h * 0.04, h - h * 0.04);
  g.textAlign = 'center';
  const dark = v.cls === 'go', mw = w * 0.84;
  g.fillStyle = dark ? '#04210f' : '#9fb0c3';
  if (v.msg){
    g.fillStyle = '#f5b301'; g.fillRect(h * 0.04, h * 0.04, w - h * 0.08, h * 0.26);
    g.fillStyle = '#1a1300'; fitFont(v.msg, h * 0.16, 800, w * 0.88); g.fillText(v.msg, w / 2, h * 0.225);
  } else {
    const lb = plain(v.label); fitFont(lb, h * 0.13, 700, mw * 0.8); g.fillText(lb, w / 2, h * 0.22);
  }
  g.fillStyle = dark ? '#04210f' : v.cls === 'warn' ? '#ff6b6b' : v.cls === 'run' ? '#f5b301' : '#e6edf3';
  const tx = plain(v.time); fitFont(tx, h * 0.4, 800, mw); g.fillText(tx, w / 2, h * 0.64);
  g.fillStyle = dark ? '#04210f' : '#9fb0c3';
  const sb = plain(v.sub); fitFont(sb, h * 0.11, 600, mw); g.fillText(sb, w / 2, h * 0.88);
  if (v.cnt != null && !v.msg){
    g.textAlign = 'right'; g.fillStyle = dark ? '#04210f' : '#e6edf3';
    g.font = '800 ' + Math.round(h * 0.15) + 'px system-ui,sans-serif'; g.fillText(String(v.cnt), w - h * 0.08, h * 0.2);
  }
}

/* ---------- main tick ---------- */
function tick(){
  processResults();
  const v = viewNow();
  box.className = 'box ' + v.cls;
  lab.innerHTML = v.label; tim.innerHTML = v.time; tim.className = 't' + (plain(v.time).length > 8 ? ' sm' : ''); sub.innerHTML = v.sub;
  if (v.cnt != null){ cntEl.hidden = false; cntEl.textContent = v.cnt; } else cntEl.hidden = true;
  if (v.key !== lastKey){ ctrl.innerHTML = v.ctrl; lastKey = v.key; }
  if (v.rem != null){ const s = Math.ceil(v.rem / 1000); if (s >= 1 && s <= 3) cue(v.cid + ':' + s, 660, 120, String(s), [60], 'c' + s); }
  if (v.go) cue(v.cid + ':go', 990, 400, v.say || tr('say_send'), [150, 60, 150], v.clip);
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
  '#map{display:grid;grid-template-columns:repeat(3,1fr);grid-template-areas:". n ." "w c e" ". s .";gap:6px;margin:6px 0}' +
  '.tile{min-height:56px;padding:5px 4px;display:flex;flex-direction:column;align-items:center;gap:3px;background:var(--pan);color:var(--tx);border:2px solid var(--bd);border-radius:10px;font-weight:800;font-size:13px}' +
  '.tile.sel{border-color:var(--am);box-shadow:0 0 0 2px rgba(245,179,1,.35)}.tile.def{background:#13242a}.tile .bdg{font-size:10px;background:#1f6f8b;color:#e6f7ff;border-radius:6px;padding:0 5px}' +
  '.tile .ld{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}.tile .ld span{font-size:14px;font-weight:900;border-radius:6px;padding:2px 7px;letter-spacing:.5px}' +
  '.rg{background:var(--gr)!important;color:#04210f!important}.rr{background:var(--rd)!important;color:#fff!important}' +
  '.ry{background:var(--am)!important;color:#241a00!important;animation:rfl .5s steps(2,start) infinite}.rf{background:var(--rd)!important;color:#fff!important;animation:rfl .25s steps(2,start) infinite}' +
  '@keyframes rfl{to{opacity:.25}}' +
  '.ratio{display:inline-flex;align-items:center;gap:2px}.rt{width:42px;padding:6px 2px}#ctrl .adj button{min-height:30px}' +
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
    const ls = leadsOn(T), sel = prof.tgt === T || ui.pickT === T;
    return '<button class="tile' + (sel ? ' sel' : '') + (inDef(T) ? ' def' : '') + '" style="grid-area:' + T.toLowerCase() + '" data-t="' + T + '">' +
      '<span>' + tn(T) + '</span>' + (inDef(T) ? '<span class="bdg">' + tr('defBadge') + '</span>' : '') +
      '<span class="ld">' + ls.map(l => '<span class="' + rallyCls(l.uid, t) + '">' + esc(l.sym) + '</span>').join('') + '</span></button>';
  }).join('') + '</div>';
  if (h !== mapHtml){ mapHtml = h; mapSec.innerHTML = h; }
}
mapSec.addEventListener('click', e => {
  const b = e.target.closest('[data-t]'); if (!b) return;
  const T = b.dataset.t;
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
  else if (act === 'pickx'){ ui.pickT = null; }
  else if (act === 'back'){ ui.editSym = false; setMe({ role: null, tgt: null }); }
  else if (act === 'sym-ok'){
    const sym = q('#inSym').value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (sym.length !== 2) return err(tr('symErr'));
    let taken = false; (isAdmin ? PL : LEADS).forEach((p, u) => { if (u !== pid && p.role === 'lead' && p.sym === sym && fresh(p)) taken = true; });
    if (taken) return err(tr('symTaken'));
    ui.editSym = false; setMe({ sym: sym });
  }
  else if (act === 'mode'){ const m = b.dataset.m; setMe({ mode: m, ep: grpOf(prof.tgt).epoch, readyAt: 0, solo: null, gs: null, mo: null }); }
  else if (act === 'mode0'){ setMe({ mode: null, solo: null, gs: null, mo: null }); }
  else if (act === 'unreg'){ setMe({ role: null, tgt: null, mode: null, solo: null, gs: null, mo: null }); }
  else if (act === 'rejoin'){ setMe({ ep: grpOf(prof.tgt).epoch, readyAt: 0 }); }
  else if (act === 'ready'){ setMe({ readyAt: Math.round(t) }); }
  else if (act === 'solo-start'){
    const r = parseRatio(q('#sr0').value, q('#sr1').value, q('#sr2').value);
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
    if (act === 'win'){ soloWin(rt); } else setMe({ solo: null, gs: null, mo: null });
  }
  else if (act === 'pick'){ setMe({ rally: b.dataset.u }); }
  else if (act === 'jchange'){ setMe({ rally: null }); }
  else if (act === 'jdbok'){ ui.disbandAt = 0; }
  invalidate(); tick();
});
box.addEventListener('input', e => {
  const m = /^sr([01])$/.exec(e.target.id || ''); if (!m) return;
  const a = $('sr0'), b2 = $('sr1'), c = $('sr2');
  if (a && b2 && c && a.value !== '' && b2.value !== ''){ const r = 100 - (parseInt(a.value, 10) || 0) - (parseInt(b2.value, 10) || 0); if (r >= 0) c.value = r; }
});
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
  setMe({ tgt: T, role: 'def', mode: null, solo: null, gs: null, mo: null, rally: null, won: won || null, readyAt: 0 });
  cue('DF' + key, 520, 250, tr('say_defense'), [200], 'df'); localMsg(tr('youDef', { t: tn(T) }));
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
  const r = !T || !prof.role ? null : prof.role === 'lead' ? tr('roleLeadSym', { s: prof.sym || '…' }) : prof.role === 'join' ? tr('roleJoinOf', { s: (pdoc(prof.rally) || {}).sym || '…' }) : tr('roleDef');
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
$('me').addEventListener('click', e => {
  if (e.target.closest('[data-me="help"]')){
    if (prof.helpReq){ setMe({ helpReq: 0 }).then(() => clearHelpBy()); } else setMe({ helpReq: Math.round(now()), helps: (prof.helps || 0) + 1 });
    tick(); return;
  }
  if (e.target.closest('[data-me="prof"]')){ ui.editProf = true; renderProfile(true); profSec.scrollIntoView({ block: 'nearest' }); return; }
  const b = e.target.closest('[data-n]'); if (!b) return;
  const mt = prof.tgt || ui.pickT || 'C', cur = prof.mar[mt]; if (!cur) return note(tr('noteMarchFirst'));
  const mar = Object.assign({}, prof.mar); mar[mt] = Math.max(1, Math.round((cur + parseFloat(b.dataset.n)) * 10) / 10);
  setMe({ mar: mar }); tick();
});
$('resetMe').onclick = () => {
  if (!confirm(tr('resetConfirm'))) return;
  ui.pickT = null; ui.editSym = false;
  setMe({ tgt: null, role: null, sym: '', mode: null, rally: null, solo: null, gs: null, mo: null, readyAt: 0, ep: 0 }); tick();
};
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
  '<div class="row tight"><button class="mini alt" id="heldBtn" data-a="held"></button><span class="sp"></span><b id="defN"></b></div>' +
  '<div class="h">' + tr('known') + '</div><div id="chips" class="row"></div>' +
  '<div class="h">' + tr('newAttack') + '</div><div class="wcard"><div class="ln"><input id="bName" class="wide" maxlength="12" placeholder="' + esc(tr('namePh')) + '" aria-label="' + esc(tr('namePh')) + '"><span class="mut">' + tr('marchWord') + '</span>' +
  '<button class="s mini alt" data-a="bm" data-d="-1">−</button><input id="bMar" inputmode="numeric" value="0:30" aria-label="' + esc(tr('marchWord')) + '"><button class="s mini alt" data-a="bm" data-d="1">+</button><button class="mini alt" data-a="eupd">' + tr('updBtn') + '</button></div>' +
  '<div class="ln"><button id="phR" class="mini" data-a="ph" data-p="rally">' + tr('rally5') + '</button><button id="phM" class="mini" data-a="ph" data-p="march">' + tr('alreadyMarching') + '</button></div>' +
  '<div class="ln"><span class="mut">' + tr('timerInGame') + '</span><input id="bTim" inputmode="numeric" placeholder="435" aria-label="' + esc(tr('timerInGame')) + '"><span class="mut" id="bEcho"></span><span class="sp"></span>' +
  '<button id="bSync" class="go" data-a="sync">' + tr('syncBtn') + '</button><button id="bCancel" class="alt mini" data-a="bcancel" hidden>✕</button></div></div>' +
  '<div class="row tight"><div class="h" style="margin:0">' + tr('timeline') + '</div><span class="sp"></span><button class="rd mini" data-a="resetdef">' + tr('resetDef') + '</button></div><div id="waves"></div></div>' + msgSkel() + '</div>';
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
  renderCtl(); renderMsg(); renderHelp();
  const ro = !hasControl();
  document.querySelectorAll('#aMsg button,#aMsg input,#aMsg select').forEach(el => { el.disabled = ro; });
  document.querySelectorAll('#aMsg label').forEach(el => { el.style.opacity = ro ? '.5' : ''; el.style.pointerEvents = ro ? 'none' : ''; });
  document.querySelectorAll('#aDef button,#aDef input').forEach(el => { el.disabled = ro; });
  document.querySelectorAll('#aAtk button,#aAtk input').forEach(el => { if (ro) el.disabled = true; });
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
  const g = grpOf(T), Ls = groupLeads(T), offs = offsetsFor(T, Ls);
  let h = '<div class="h">' + tr('grpHdr') + '</div>';
  if (!g.on){
    h += '<div class="row tight"><span class="mut">' + tr('troops', { r: '' }).trim() + '</span>' + rIn('gr', g.ratio || lastRatio()) + '<button data-a="gcall">' + tr('callGroup') + '</button></div>';
  } else {
    const J = Ls.reduce((n, l) => n + joinersOf(l.uid).length, 0);
    const pv = Ls.length ? buildPlan(Ls.map((l, i) => ({ uid: l.uid, march: (l.mar || {})[T] || 0, off: offs[i] })), g.buffer || 10, 0) : null;
    h += '<div class="row tight"><span class="mut">' + tr('troops', { r: '' }).trim() + '</span>' + rIn('gr', g.ratio) + '<button class="mini alt" data-a="gratio">' + tr('setRatio') + '</button><span class="sp"></span><button class="mini alt" data-a="gend">' + tr('endGroup') + '</button></div>';
    h += '<div class="row tight"><b>' + tr('leadersJoiners', { a: Ls.length, b: J }) + '</b><span class="sp"></span>' +
      '<button class="' + (g.confirmed ? 'go' : '') + '" data-a="confirm" ' + (g.confirmed ? 'disabled' : '') + '>' + (g.confirmed ? tr('leadersLocked') : tr('confirmLeaders')) + '</button></div>';
    h += '<div class="h">' + tr('hitOrder') + '</div>';
    Ls.forEach((l, i) => {
      const rdy = g.stage === 'ready' ? (l.readyAt || 0) > g.rcAt : g.stage === 'countdown';
      h += '<div class="lrow"><span class="ar"><button class="alt" data-a="up" data-u="' + l.uid + '" aria-label="' + esc(tr('moveUp')) + '">↑</button><button class="alt" data-a="dn" data-u="' + l.uid + '" aria-label="' + esc(tr('moveDown')) + '">↓</button></span>' +
        '<span class="sym ' + (rdy ? 'rdy' : '') + '">' + esc(l.sym) + '</span><span>' + esc(l.name || '') + '</span><b>' + fmtMS((l.mar || {})[T]) + '</b><span class="mut">' + tr('joinedN', { n: joinersOf(l.uid).length }) + '</span><span class="sp"></span>' +
        '<button class="alt s mini" data-a="off" data-u="' + l.uid + '" data-d="-0.1">−</button><b>+' + offs[i].toFixed(1) + '</b><button class="alt s mini" data-a="off" data-u="' + l.uid + '" data-d="0.1">+</button>' +
        '<b class="mut" data-ar="' + l.uid + '" data-pv="' + (pv ? (pv.launch[l.uid] / 1000).toFixed(1) : '') + '"></b>' +
        '<span class="ln"><span class="mut">' + tr('ratioOv') + '</span><input class="wide" style="width:96px" data-ov="' + l.uid + '" placeholder="' + esc(g.ratio || '40/30/30') + '" value="' + esc((g.rOv || {})[l.uid] || '') + '"></span></div>';
    });
    if (!Ls.length) h += '<div class="mut">' + tr('noLeadersMsg') + '</div>';
    h += '<div class="row tight"><span class="mut">' + tr('leadBuffer') + '</span>' + [5, 10, 15, 30].map(n => '<button class="mini ' + ((g.buffer || 10) === n ? '' : 'alt') + '" data-a="buf" data-n="' + n + '">' + n + 's</button>').join('') + '</div>';
    h += '<div class="row"><button class="go" data-a="rcheck">' + tr('readyCheckBtn') + '</button><button class="alt" data-a="start">' + tr('startNow') + '</button><button class="rd" data-a="reset">' + tr('reset') + '</button></div>';
    h += '<div class="mut" id="atkSt"></div><div class="mut">' + tr('offsetsNote') + '</div>';
  }
  const R = ralliesOn(T);
  h += '<div class="h">' + tr('ralliesHdr', { t: tn(T) }) + '</div>';
  if (!R.length) h += '<div class="mut">' + tr('noRallies') + '</div>';
  R.forEach(x => {
    const p = x.p, J = joinersOf(p.uid);
    h += '<div class="wcard' + (ui.helping && ui.helping.lead === p.uid ? ' u' : '') + '"><div class="ln"><span class="sym">' + esc(p.sym) + '</span><span>' + esc(p.name || '') + '</span><span class="mut">' + tr(p.mode === 'solo' ? 'soloTag' : 'groupTag') + '</span>' +
      '<span class="mut">' + esc(ratioOf(p.uid)) + '</span><span class="sp"></span><span class="tm" data-rl="' + p.uid + '"></span></div>' +
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
  setH($('chips'), E.length
    ? E.map(e => '<span class="chip"><button class="alt mini" data-a="enemy" data-n="' + esc(e.name) + '">' + esc(e.name) + ' ' + fmtMS(e.march) + (e.ok ? '' : '?') + '</button>' +
        '<button class="alt mini" data-a="enemydel" data-n="' + esc(e.name) + '" aria-label="' + esc(tr('forgetOne', { n: e.name })) + '">✕</button></span>').join('') +
      '<button class="rd mini" data-a="enemyclear">' + tr('forgetAll') + '</button>'
    : '<span class="mut">' + tr('knownNone') + '</span>');
  $('phR').className = 'mini ' + (bar.phase === 'rally' ? '' : 'alt'); $('phM').className = 'mini ' + (bar.phase === 'march' ? '' : 'alt');
  $('bSync').textContent = bar.editId ? tr('resyncBtn') : tr('syncBtn'); $('bCancel').hidden = !bar.editId;
  let h = '';
  info.forEach((w, i) => {
    if (w.gap !== null) h += '<div class="mut ' + (w.urgent ? 'urg' : '') + '" style="margin:2px 0 2px 10px">' + tr('gapLbl', { a: info[i - 1].label, b: w.label, s: w.gap.toFixed(1) }) + '</div>';
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
    if (st) st.textContent = g.stage === 'countdown' ? (t < g.cdEnd ? tr('stStarting', { n: Math.ceil((g.cdEnd - t) / 1000) }) : tr('stRunning')) : g.stage === 'ready' ? tr('stReadyWait') : (g.confirmed ? tr('stConfirmed') : tr('stCollecting'));
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
function clearBar(){ bar.editId = null; const n = $('bName'), tm = $('bTim'), e = $('bEcho'), m = $('bMar'); if (n) n.value = ''; if (tm) tm.value = ''; if (m) m.value = '0:30'; if (e) e.textContent = ''; }

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
  TARGETS.forEach(T => {
    const g = grpOf(T);
    if (g.on && g.stage === 'ready'){
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
    u['tg.' + T + '.grp.stage'] = 'lobby'; u['tg.' + T + '.grp.plan'] = null; u['tg.' + T + '.grp.cdEnd'] = 0;
    if (kind === 'win'){ u['tg.' + T + '.grp.confirmed'] = false; u['tg.' + T + '.grp.epoch'] = (g.epoch || 0) + 1; u['tg.' + T + '.grp.order'] = []; u['tg.' + T + '.grp.off'] = {}; }
  }
  if (kind === 'win') u['tg.' + T + '.held'] = true;
  upd(u);
}

adminSec.addEventListener('input', e => {
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
    const oldRef = pid ? meRef() : null;
    try {
      await signInWithEmailAndPassword(auth, $('em').value.trim(), $('pw').value);
    } catch (err){
      const c = (err && err.code) || '';
      x.textContent = c.includes('operation-not-allowed') ? tr('errEmailOff') : /invalid|wrong|not-found|missing|too-many/.test(c) ? tr('badLogin') : tr('errGeneric', { m: err.message });
      return;
    }
    try {
      if (oldRef) deleteDoc(oldRef).catch(() => {});
      setIds(); await syncClock(); invalidate(); if (profileDone()) pushMe(); restartListeners();
    } catch (e){ fail(e); }
    return joinAdmin(nm);
  }
  if (a === 'closelogin'){ adminSec.hidden = true; adminSec.innerHTML = ''; return; }
  if (!isAdmin) return;
  if (a === 'logout'){
    await leaveCtl();
    try { await deleteDoc(meRef()).catch(() => {}); await signOut(auth); await signInAnonymously(auth); setIds(); await syncClock(); if (profileDone()) pushMe(); restartListeners(); } catch (x) { fail(x); }
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
  if (a === 'gcall' || a === 'gratio'){
    const r = parseRatio($('gr0').value, $('gr1').value, $('gr2').value);
    if (!r) return note(tr('ratioErr'));
    try { localStorage.setItem('tacsync_ratio', r); } catch (x) {}
    if (a === 'gratio') return upd({ [P + 'grp.ratio']: r });
    upd({ [P + 'grp']: { on: true, ratio: r, stage: 'lobby', confirmed: false, order: [], off: {}, buffer: g.buffer || 10, cdEnd: 0, plan: null, epoch: g.epoch || 0, rcAt: 0, rOv: {} } });
  }
  else if (a === 'gend'){ if (confirm(tr('endGroupQ', { t: tn(T) }))) upd({ [P + 'grp.on']: false, [P + 'grp.stage']: 'lobby', [P + 'grp.plan']: null, [P + 'grp.confirmed']: false, [P + 'grp.epoch']: (g.epoch || 0) + 1 }); }
  else if (a === 'confirm'){ upd({ [P + 'grp.confirmed']: true, [P + 'grp.order']: groupLeads(T).map(l => l.uid) }); }
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
  else if (a === 'rcheck'){ if (!g.confirmed) return note(tr('noteConfirmFirst')); upd({ [P + 'grp.stage']: 'ready', [P + 'grp.plan']: null, [P + 'grp.rcAt']: Math.round(now()) }); }
  else if (a === 'start'){ if (!groupLeads(T).length) return note(tr('noteNoLeaders')); startCountdown(T); }
  else if (a === 'reset'){ if (confirm(tr('resetOpConfirm'))) upd({ [P + 'grp.stage']: 'lobby', [P + 'grp.confirmed']: false, [P + 'grp.plan']: null, [P + 'grp.cdEnd']: 0, [P + 'grp.order']: [], [P + 'grp.off']: {}, [P + 'grp.epoch']: (g.epoch || 0) + 1 }); }
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
    const known = E.find(x => x.name === name);
    const march = parseMS($('bMar').value) || (known ? known.march : 30), timer = parseMS($('bTim').value);
    if (timer == null) return note(tr('noteTypeTimer'));
    if (!bar.editId && W.length >= 6) return note(tr('noteLimit'));
    const t = Math.round(now());
    const rallyEnd = bar.phase === 'rally' ? t + timer * 1000 : null, landAt = bar.phase === 'rally' ? rallyEnd + march * 1000 : t + timer * 1000;
    const old = bar.editId ? W.find(x => x.id === bar.editId) : null;
    const ok = !!(known && known.ok && known.march === march);
    const w = { id: bar.editId || ('w' + t), name: name, march: march, rallyEnd: rallyEnd, landAt: landAt, off: old && old.off != null ? old.off : 0.4, mc: ok };
    const nw = old ? W.map(x => x.id === w.id ? w : x) : W.concat([w]);
    upd({ [P + 'waves']: nw, [P + 'enemies']: E.filter(x => x.name !== name).concat([{ name: name, march: march, ok: ok }]) });
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
  const ov = e.target.dataset && e.target.dataset.ov;
  if (ov && hasControl()){
    const v = e.target.value.trim(), P = 'tg.' + mgT() + '.grp.rOv.' + ov;
    if (!v){ upd({ [P]: deleteField() }); return; }
    const p = v.split('/'), r = parseRatio(p[0], p[1], p[2]);
    if (!r){ note(tr('ratioErr')); return; }
    e.target.value = r; upd({ [P]: r });
  }
});

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
/* Voice-button clips uploaded by the admin. Fetched once, and again only when replaced. */
function b64ToBuf(b){ const s = atob(b), u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u.buffer; }
function bufToB64(ab){ const u = new Uint8Array(ab); let s = ''; for (let i = 0; i < u.length; i += 8192) s += String.fromCharCode.apply(null, u.subarray(i, i + 8192)); return btoa(s); }
async function loadVoices(){
  if (!db || !D || (!isAdmin && !(soundOn && voiceMode === 'rec'))) return;
  const have = (D && D.vclip) || {}, jobs = [];
  for (let i = 0; i < 6; i++){
    const id = 'v' + i, e = have[id];
    if (!e){ if (CLIP.vver[id]){ delete CLIP.vver[id]; delete CLIP.buf[id]; } continue; }
    if (CLIP.vver[id] === e.v) continue;
    if (!CLIP.vload[id] || CLIP.vload[id].v !== e.v){
      const job = getDoc(voiceRef(i)).then(async sn => {
        if (!sn.exists()) return;
        CLIP.buf[id] = await decode(b64ToBuf(sn.data().d)); CLIP.vver[id] = e.v;
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
    CLIP.buf['v' + i] = buf; CLIP.vver['v' + i] = ver;
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
    '<button class="mini alt" data-a="cplay" data-c="v' + i + '">' + tr('playBtn') + '</button><button class="mini alt" data-a="vdel" data-i="' + i + '" aria-label="' + esc(tr('delBtn')) + '">✕</button>';
}
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
  onMsg(); loadVoices();
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
function restartListeners(){ myjFor = 'x'; mylFor = 'x'; selfFor = 'x'; syncMyJoiners(); syncMyLead(); syncSelf(); startLeads(); }

/* ---------- pop-out, wake lock ---------- */
function primeVideo(){ try { tick(); if (!vid.srcObject) vid.srcObject = cv.captureStream(10); vid.play().catch(() => {}); } catch (e) {} }
primeVideo(); document.addEventListener('pointerdown', primeVideo, { once: true });
function openPop(){
  if ('documentPictureInPicture' in window){
    documentPictureInPicture.requestWindow({ width: 320, height: 210 }).then(pw => {
      const st = pw.document.createElement('style');
      st.textContent = Array.from(document.querySelectorAll('style')).map(s => s.textContent).join('\n') + 'body{margin:0;padding:6px;background:#0d1117;color:#e6edf3;font:14px system-ui,sans-serif}';
      pw.document.head.append(st);
      pw.document.documentElement.dir = document.documentElement.dir; pw.document.documentElement.lang = lang;
      pw.document.body.append(box); popped = true;
      pw.addEventListener('pagehide', () => { popped = false; $('boxSlot').append(box); });
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



/* ---------- boot ---------- */
(async function boot(){
  applyLang(); renderProfile(true);
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
    if (nm) joinAdmin(nm); else loginForm();
  }
})();
