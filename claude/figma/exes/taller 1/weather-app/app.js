const WMO_BG = {
  0:  ['#FFB347', '#1E2A4A'],
  1:  ['#FFBF69', '#263554'],
  2:  ['#7EB8D4', '#2E3F5C'],
  3:  ['#8B9BAD', '#3A3F4A'],
  45: ['#A8B5BE', '#3C4048'],
  48: ['#A8B5BE', '#3C4048'],
  51: ['#7094AD', '#2C3E50'],
  53: ['#7094AD', '#2C3E50'],
  55: ['#5A7FA5', '#243447'],
  61: ['#4A6FA5', '#1E2F45'],
  63: ['#3D6495', '#18283C'],
  65: ['#2F5485', '#12202F'],
  71: ['#B8CEDE', '#4A5A6E'],
  73: ['#C8D8E8', '#4A5A6E'],
  75: ['#D8E8F0', '#4A5A6E'],
  80: ['#5A82A8', '#223345'],
  81: ['#4A72A0', '#1C2E40'],
  82: ['#3A5888', '#16253A'],
  95: ['#2D3561', '#0F1624'],
  99: ['#1E2650', '#0A1020'],
};

const WMO_ICONS = {
  0:  ['wi-day-sunny',          'wi-night-clear'],
  1:  ['wi-day-sunny-overcast', 'wi-night-partly-cloudy'],
  2:  ['wi-day-cloudy',         'wi-night-alt-cloudy'],
  3:  ['wi-cloudy',             'wi-cloudy'],
  45: ['wi-day-fog',            'wi-night-fog'],
  48: ['wi-day-fog',            'wi-night-fog'],
  51: ['wi-day-sprinkle',       'wi-night-sprinkle'],
  53: ['wi-day-sprinkle',       'wi-night-sprinkle'],
  55: ['wi-day-sprinkle',       'wi-night-sprinkle'],
  61: ['wi-day-rain',           'wi-night-rain'],
  63: ['wi-day-rain',           'wi-night-rain'],
  65: ['wi-day-rain',           'wi-night-rain'],
  71: ['wi-day-snow',           'wi-night-snow'],
  73: ['wi-day-snow',           'wi-night-snow'],
  75: ['wi-day-snow',           'wi-night-snow'],
  80: ['wi-day-showers',        'wi-night-showers'],
  81: ['wi-day-showers',        'wi-night-showers'],
  82: ['wi-day-storm-showers',  'wi-night-storm-showers'],
  95: ['wi-day-thunderstorm',   'wi-night-thunderstorm'],
  99: ['wi-day-thunderstorm',   'wi-night-thunderstorm'],
};

// country code → language
const COUNTRY_LANG = {
  es:'es', mx:'es', ar:'es', co:'es', pe:'es', ve:'es', cl:'es', ec:'es',
  bo:'es', py:'es', uy:'es', cr:'es', pa:'es', gt:'es', hn:'es', sv:'es',
  ni:'es', do:'es', cu:'es', pr:'es',
  fr:'fr', be:'fr', cd:'fr', cm:'fr', ci:'fr', mg:'fr', sn:'fr',
  de:'de', at:'de', li:'de',
  it:'it',
  pt:'pt', br:'pt', ao:'pt', mz:'pt',
  jp:'ja',
  cn:'zh', tw:'zh', hk:'zh',
  ru:'ru', by:'ru', kz:'ru',
  nl:'nl',
  pl:'pl',
  fi:'fi',
};

const PHRASES = {
  es: [
    [c => c >= 95,              '¡Dios mío, esto parece el apocalipsis! No salgas de casa.'],
    [c => c >= 80,              'Va a llover a cántaros. Coge el paraguas o arrepiéntete.'],
    [c => c >= 61,              'Lluvia asegurada. No te fíes del cielo hoy.'],
    [c => c >= 71,              '¡Nieve! Precioso… si no tienes que ir a ningún sitio.'],
    [c => c >= 51,              'Algo de llovizna. Tampoco es el fin del mundo.'],
    [c => c >= 45,              'Hay niebla. Conduce despacio y con cuidado.'],
    [(c,t) => t >= 35,          '¡Madre mía qué calor! Quédate en la sombra y bebe agua.'],
    [(c,t) => t >= 28,          'Hace calor de verdad. El verano aprieta.'],
    [(c,t) => c <= 2 && t >= 20,'¡Qué día tan bonito! Sal a disfrutarlo.'],
    [(c,t) => c <= 2 && t >= 12,'Buen tiempo y temperatura agradable. Un lujo.'],
    [(c,t) => c <= 2 && t < 5,  'Sol pero mucho frío. Abrígate bien antes de salir.'],
    [(c,t) => t < 0,            'Bajo cero. Hoy el mundo está congelado.'],
    [(c,t) => t < 8,            'Frío que pela. Abrigo obligatorio.'],
    [c => c === 3,              'Nublado toda la tarde. Nada especial, nada terrible.'],
    [() => true,                'Un día normalito. Sin sorpresas.'],
  ],
  en: [
    [c => c >= 95,              'God, this looks like the apocalypse! Stay home.'],
    [c => c >= 80,              "It's going to rain cats and dogs. Grab an umbrella."],
    [c => c >= 61,              "Rain guaranteed. Don't trust the sky today."],
    [c => c >= 71,              "Snow! Beautiful… if you don't have anywhere to be."],
    [c => c >= 51,              'A bit of drizzle out there. Not the end of the world.'],
    [c => c >= 45,              'Foggy out there. Drive slow and careful.'],
    [(c,t) => t >= 35,          "Bloody hell it's hot! Stay in the shade and drink water."],
    [(c,t) => t >= 28,          "It's really warm out there. Summer is pressing hard."],
    [(c,t) => c <= 2 && t >= 20,"What a beautiful day! Go out and enjoy it."],
    [(c,t) => c <= 2 && t >= 12,'Good weather and a pleasant temperature. A luxury.'],
    [(c,t) => c <= 2 && t < 5,  'Sunny but very cold. Bundle up before going out.'],
    [(c,t) => t < 0,            'Below zero. The world is frozen today.'],
    [(c,t) => t < 8,            'Freezing cold. Coat mandatory.'],
    [c => c === 3,              'Cloudy all day. Nothing special, nothing terrible.'],
    [() => true,                'A normal day. No surprises.'],
  ],
  fr: [
    [c => c >= 95,              "Mon Dieu, c'est l'apocalypse ! Reste chez toi."],
    [c => c >= 80,              'Il va pleuvoir des cordes. Prends ton parapluie.'],
    [c => c >= 61,              "Pluie garantie. Ne fais pas confiance au ciel aujourd'hui."],
    [c => c >= 71,              "De la neige ! Magnifique… si tu n'as nulle part où aller."],
    [c => c >= 51,              'Un peu de bruine. Pas la fin du monde.'],
    [c => c >= 45,              'Du brouillard. Conduis lentement et prudemment.'],
    [(c,t) => t >= 35,          "Quelle chaleur ! Reste à l'ombre et bois de l'eau."],
    [(c,t) => t >= 28,          'Il fait vraiment chaud. L\'été se fait sentir.'],
    [(c,t) => c <= 2 && t >= 20,"Quelle belle journée ! Sors en profiter."],
    [(c,t) => c <= 2 && t >= 12,'Beau temps et température agréable. Un luxe.'],
    [(c,t) => c <= 2 && t < 5,  'Du soleil mais très froid. Couvre-toi bien.'],
    [(c,t) => t < 0,            'En dessous de zéro. Le monde est gelé aujourd\'hui.'],
    [(c,t) => t < 8,            'Un froid mordant. Manteau obligatoire.'],
    [c => c === 3,              'Nuageux toute la journée. Rien de spécial.'],
    [() => true,                'Une journée normale. Pas de surprises.'],
  ],
  de: [
    [c => c >= 95,              'Mein Gott, das sieht nach Apokalypse aus! Bleib zuhause.'],
    [c => c >= 80,              'Es wird in Strömen regnen. Nimm einen Regenschirm.'],
    [c => c >= 61,              'Regen garantiert. Vertrau dem Himmel heute nicht.'],
    [c => c >= 71,              "Schnee! Wunderschön… wenn du nirgendwo hinmusst."],
    [c => c >= 51,              'Ein bisschen Nieselregen. Kein Weltuntergang.'],
    [c => c >= 45,              'Nebel. Fahr langsam und vorsichtig.'],
    [(c,t) => t >= 35,          'Was für eine Hitze! Bleib im Schatten und trink Wasser.'],
    [(c,t) => t >= 28,          'Es ist wirklich warm. Der Sommer drückt.'],
    [(c,t) => c <= 2 && t >= 20,'Was für ein schöner Tag! Geh raus und genieß ihn.'],
    [(c,t) => c <= 2 && t >= 12,'Gutes Wetter und angenehme Temperatur. Ein Luxus.'],
    [(c,t) => c <= 2 && t < 5,  'Sonnig aber sehr kalt. Zieh dich warm an.'],
    [(c,t) => t < 0,            'Unter null. Die Welt ist heute eingefroren.'],
    [(c,t) => t < 8,            'Bitterkalt. Mantel ist Pflicht.'],
    [c => c === 3,              'Den ganzen Tag bewölkt. Nichts Besonderes.'],
    [() => true,                'Ein normaler Tag. Keine Überraschungen.'],
  ],
  it: [
    [c => c >= 95,              "Dio mio, sembra l'apocalisse! Non uscire di casa."],
    [c => c >= 80,              'Pioverà a dirotto. Prendi l\'ombrello o te ne pentirai.'],
    [c => c >= 61,              'Pioggia garantita. Non fidarti del cielo oggi.'],
    [c => c >= 71,              "Neve! Bellissima… se non devi andare da nessuna parte."],
    [c => c >= 51,              'Un po\' di pioggerella. Non è la fine del mondo.'],
    [c => c >= 45,              "C'è nebbia. Guida piano e con attenzione."],
    [(c,t) => t >= 35,          'Che caldo! Stai all\'ombra e bevi acqua.'],
    [(c,t) => t >= 28,          'Fa davvero caldo. L\'estate stringe.'],
    [(c,t) => c <= 2 && t >= 20,'Che bella giornata! Esci a goderti il sole.'],
    [(c,t) => c <= 2 && t >= 12,'Bel tempo e temperatura gradevole. Un lusso.'],
    [(c,t) => c <= 2 && t < 5,  'Sole ma molto freddo. Copriti bene prima di uscire.'],
    [(c,t) => t < 0,            'Sotto zero. Il mondo è ghiacciato oggi.'],
    [(c,t) => t < 8,            'Freddo pungente. Cappotto obbligatorio.'],
    [c => c === 3,              'Nuvoloso tutto il giorno. Niente di speciale.'],
    [() => true,                'Una giornata normale. Nessuna sorpresa.'],
  ],
  pt: [
    [c => c >= 95,              'Meu Deus, parece o apocalipse! Não saia de casa.'],
    [c => c >= 80,              'Vai chover muito. Pegue o guarda-chuva ou se arrependa.'],
    [c => c >= 61,              'Chuva garantida. Não confie no céu hoje.'],
    [c => c >= 71,              "Neve! Lindo… se você não tiver que ir a lugar nenhum."],
    [c => c >= 51,              'Um pouco de garoa. Não é o fim do mundo.'],
    [c => c >= 45,              'Tem neblina. Dirija devagar e com cuidado.'],
    [(c,t) => t >= 35,          'Que calor! Fique na sombra e beba água.'],
    [(c,t) => t >= 28,          'Está realmente quente. O verão aperta.'],
    [(c,t) => c <= 2 && t >= 20,'Que dia lindo! Saia para aproveitar.'],
    [(c,t) => c <= 2 && t >= 12,'Bom tempo e temperatura agradável. Um luxo.'],
    [(c,t) => c <= 2 && t < 5,  'Sol mas muito frio. Agasalhe-se bem antes de sair.'],
    [(c,t) => t < 0,            'Abaixo de zero. O mundo está congelado hoje.'],
    [(c,t) => t < 8,            'Frio que corta. Casaco obrigatório.'],
    [c => c === 3,              'Nublado o dia todo. Nada especial.'],
    [() => true,                'Um dia normal. Sem surpresas.'],
  ],
  ja: [
    [c => c >= 95,              '神様、これは世界の終わりみたい！家にいなよ。'],
    [c => c >= 80,              '土砂降りになるよ。傘を持って行きな。'],
    [c => c >= 61,              '雨確定。今日は空を信じちゃダメ。'],
    [c => c >= 71,              '雪だ！どこにも行かなくていいなら、素敵だね。'],
    [c => c >= 51,              '少し霧雨が降るかも。まあ大したことないけど。'],
    [c => c >= 45,              '霧が出てる。ゆっくり運転してね。'],
    [(c,t) => t >= 35,          'すごく暑い！日陰にいて水を飲んでね。'],
    [(c,t) => t >= 28,          '本当に暑いね。夏が本気を出してる。'],
    [(c,t) => c <= 2 && t >= 20,'なんて素敵な一日！外に出て楽しんで。'],
    [(c,t) => c <= 2 && t >= 12,'いい天気で気持ちいい気温。最高だね。'],
    [(c,t) => c <= 2 && t < 5,  '晴れてるけどすごく寒い。しっかり着込んでね。'],
    [(c,t) => t < 0,            '氷点下だよ。今日は世界が凍ってる。'],
    [(c,t) => t < 8,            '寒くて震えそう。コートは必須。'],
    [c => c === 3,              '一日中曇り。特に何もない普通の日。'],
    [() => true,                '普通の一日。サプライズなし。'],
  ],
  zh: [
    [c => c >= 95,              '我的天，这简直像世界末日！别出门了。'],
    [c => c >= 80,              '要下大雨了。拿好雨伞，否则你会后悔的。'],
    [c => c >= 61,              '铁定下雨。今天别信这片天。'],
    [c => c >= 71,              '下雪啦！真美……前提是你不用去哪儿。'],
    [c => c >= 51,              '有点毛毛雨。也没那么严重啦。'],
    [c => c >= 45,              '有雾。开车要慢，小心一点。'],
    [(c,t) => t >= 35,          '天哪好热！待在阴凉处，多喝水。'],
    [(c,t) => t >= 28,          '真的好热。夏天不饶人。'],
    [(c,t) => c <= 2 && t >= 20,'多好的天气！出去享受一下吧。'],
    [(c,t) => c <= 2 && t >= 12,'天气好，气温舒适。太享受了。'],
    [(c,t) => c <= 2 && t < 5,  '晴天但很冷。出门前穿好衣服。'],
    [(c,t) => t < 0,            '零下了。今天整个世界都冻住了。'],
    [(c,t) => t < 8,            '冷得刺骨。外套必备。'],
    [c => c === 3,              '一整天都是阴天。没什么特别的。'],
    [() => true,                '普通的一天。没什么惊喜。'],
  ],
  ru: [
    [c => c >= 95,              'Господи, это похоже на апокалипсис! Не выходи из дома.'],
    [c => c >= 80,              'Будет ливень. Возьми зонт, иначе пожалеешь.'],
    [c => c >= 61,              'Дождь обеспечен. Небу сегодня не доверяй.'],
    [c => c >= 71,              'Снег! Красота… если никуда не надо идти.'],
    [c => c >= 51,              'Небольшая морось. Ничего страшного.'],
    [c => c >= 45,              'Туман. Езди медленно и осторожно.'],
    [(c,t) => t >= 35,          'Боже, какая жара! Оставайся в тени и пей воду.'],
    [(c,t) => t >= 28,          'Действительно жарко. Лето даёт жару.'],
    [(c,t) => c <= 2 && t >= 20,'Какой чудесный день! Выходи и наслаждайся.'],
    [(c,t) => c <= 2 && t >= 12,'Хорошая погода и приятная температура. Роскошь.'],
    [(c,t) => c <= 2 && t < 5,  'Солнечно, но очень холодно. Оденься теплее.'],
    [(c,t) => t < 0,            'Ниже нуля. Сегодня весь мир замёрз.'],
    [(c,t) => t < 8,            'Дубак. Пальто обязательно.'],
    [c => c === 3,              'Пасмурно весь день. Ничего особенного.'],
    [() => true,                'Обычный день. Никаких сюрпризов.'],
  ],
  ca: [
    [c => c >= 95,              "Déu meu, sembla l'apocalipsi! No sortis de casa."],
    [c => c >= 80,              "Plourà a bots i barrals. Agafa el paraigua o te'n penediràs."],
    [c => c >= 61,              'Pluja assegurada. No et fiïs del cel avui.'],
    [c => c >= 71,              'Neu! Preciós… si no has d\'anar a cap lloc.'],
    [c => c >= 51,              'Una mica de plugim. Tampoc és la fi del món.'],
    [c => c >= 45,              'Hi ha boira. Condueix a poc a poc i amb cura.'],
    [(c,t) => t >= 35,          'Mare de Déu quina calor! Queda\'t a l\'ombra i beu aigua.'],
    [(c,t) => t >= 28,          'Fa molta calor. L\'estiu apreta.'],
    [(c,t) => c <= 2 && t >= 20,'Quin dia tan bonic! Surt a gaudir-lo.'],
    [(c,t) => c <= 2 && t >= 12,'Bon temps i temperatura agradable. Un luxe.'],
    [(c,t) => c <= 2 && t < 5,  'Sol però molt fred. Abriga\'t bé abans de sortir.'],
    [(c,t) => t < 0,            'Sota zero. Avui el món està glaçat.'],
    [(c,t) => t < 8,            'Fred que pela. Abric obligatori.'],
    [c => c === 3,              'Ennuvolat tota la tarda. Res especial, res terrible.'],
    [() => true,                'Un dia normalot. Sense sorpreses.'],
  ],
  gl: [
    [c => c >= 95,              'Meu Deus, isto parece o apocalipse! Non saias de casa.'],
    [c => c >= 80,              'Vai chover a cachón. Colle o paraugas ou arrepentiraste.'],
    [c => c >= 61,              'Choiva asegurada. Non te fíes do ceo hoxe.'],
    [c => c >= 71,              'Neve! Precioso… se non tes que ir a ningún sitio.'],
    [c => c >= 51,              'Algo de orballo por aí. Tampouco é o fin do mundo.'],
    [c => c >= 45,              'Hai néboa. Conduce devagar e con coidado.'],
    [(c,t) => t >= 35,          'Ai que calor! Quédate á sombra e bebe auga.'],
    [(c,t) => t >= 28,          'Fai calor de verdade. O verán aperta.'],
    [(c,t) => c <= 2 && t >= 20,'Que día tan bonito! Sae a gozalo.'],
    [(c,t) => c <= 2 && t >= 12,'Bo tempo e temperatura agradable. Un luxo.'],
    [(c,t) => c <= 2 && t < 5,  'Sol pero moito frío. Abrígate ben antes de saír.'],
    [(c,t) => t < 0,            'Baixo cero. Hoxe o mundo está xeado.'],
    [(c,t) => t < 8,            'Frío que pela. Abrigo obrigatorio.'],
    [c => c === 3,              'Nubrado toda a tarde. Nada especial, nada terrible.'],
    [() => true,                'Un día normalciño. Sen sorpresas.'],
  ],
  fi: [
    [c => c >= 95,              'Hyvä Jumala, tämä näyttää apokalypsiltä! Pysy kotona.'],
    [c => c >= 80,              'Tulee kaatamalla. Ota sateenvarjo tai kadu.'],
    [c => c >= 61,              'Sade on taattu. Älä luota taivaaseen tänään.'],
    [c => c >= 71,              'Lunta! Kaunista… jos ei tarvitse mennä minnekään.'],
    [c => c >= 51,              'Vähän tihkusadetta. Ei mikään maailmanloppu.'],
    [c => c >= 45,              'Sumuista. Aja hitaasti ja varovaisesti.'],
    [(c,t) => t >= 35,          'Voi ei, mikä helle! Pysy varjossa ja juo vettä.'],
    [(c,t) => t >= 28,          'Todella lämmin päivä. Kesä pitää otteessaan.'],
    [(c,t) => c <= 2 && t >= 20,'Mikä ihana päivä! Mene ulos nauttimaan.'],
    [(c,t) => c <= 2 && t >= 12,'Hyvä sää ja miellyttävä lämpötila. Hienoa.'],
    [(c,t) => c <= 2 && t < 5,  'Aurinkoista mutta hyvin kylmää. Pue lämpimästi.'],
    [(c,t) => t < 0,            'Pakkasta. Maailma on jäässä tänään.'],
    [(c,t) => t < 8,            'Paleltaa. Takki on pakollinen.'],
    [c => c === 3,              'Pilvistä koko päivän. Ei mitään erityistä.'],
    [() => true,                'Tavallinen päivä. Ei yllätyksiä.'],
  ],
};

function getLang(countryCode, state) {
  const s = (state || '').toLowerCase();
  if (countryCode === 'es') {
    if (/galicia/.test(s)) return 'gl';
    if (/catalu|valencian|bale/.test(s)) return 'ca';
  }
  if (countryCode === 'ad') return 'ca'; // Andorra también habla catalán
  return COUNTRY_LANG[countryCode?.toLowerCase()] || 'en';
}

function getPhrase(codes, temps, lang) {
  const avg = temps.reduce((a, b) => a + b, 0) / temps.length;
  const worst = Math.max(...codes);
  const rules = PHRASES[lang] || PHRASES.en;
  for (const [test, phrase] of rules) {
    if (test(worst, avg)) return phrase;
  }
}

function getBg(code, hour) {
  const entry = WMO_BG[code] || ['#ff7676', '#1E2A4A'];
  return hour >= 6 && hour < 21 ? entry[0] : entry[1];
}

function getIcon(code, hour) {
  const entry = WMO_ICONS[code] || ['wi-na', 'wi-na'];
  const isDay = hour >= 6 && hour < 21;
  return `icons/${isDay ? entry[0] : entry[1]}.svg`;
}

async function load(lat, lon) {
  try {
    const [weather, geo] = await Promise.all([
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&current_weather=true&timezone=auto&forecast_days=1`).then(r => r.json()),
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`, { headers: { 'Accept-Language': 'es' } }).then(r => r.json()),
    ]);

    const addr = geo.address;
    const lang = getLang(geo.address.country_code, geo.address.state);

    document.getElementById('city').textContent =
      addr.city || addr.town || addr.village || addr.county || '';

    const currentTemp = Math.round(weather.current_weather.temperature);
    const currentCode = weather.current_weather.weathercode;
    const currentHour = new Date().getHours();

    document.getElementById('temp').textContent = `${currentTemp}º`;
    document.getElementById('icon').src = getIcon(currentCode, currentHour);
    document.body.style.background = getBg(currentCode, currentHour);

    const now = new Date();
    const times = weather.hourly.time;
    const temps = weather.hourly.temperature_2m;
    const codes = weather.hourly.weathercode;
    const start = Math.max(0, times.findIndex(t => new Date(t) >= now) - 1);

    document.getElementById('phrase').textContent =
      getPhrase(codes.slice(start, start + 8), temps.slice(start, start + 8), lang);
  } catch {
    document.getElementById('phrase').textContent = 'Could not load weather.';
  }
}

const cityParam = new URLSearchParams(location.search).get('city');

if (cityParam) {
  document.getElementById('city').textContent = cityParam;
  fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityParam)}&format=json&limit=1`, { headers: { 'Accept-Language': 'es' } })
    .then(r => r.json())
    .then(data => {
      if (!data.length) return (document.getElementById('phrase').textContent = 'City not found.');
      load(parseFloat(data[0].lat), parseFloat(data[0].lon));
    });
} else {
  navigator.geolocation.getCurrentPosition(
    p => load(p.coords.latitude, p.coords.longitude),
    () => (document.getElementById('phrase').textContent = 'Enable location to see the weather.')
  );
}
