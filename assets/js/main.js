/* =========================================================
   دليل فعاليات الجامعة الافتراضية — ملف JavaScript الرئيسي
   يحتوي: بيانات الفعاليات + وظائف مشتركة + منطق كل صفحة.
   كل صفحة تحدد نفسها عبر الخاصية data-page على عنصر body.
   ========================================================= */

/* ---------- بيانات الفعاليات ---------- */
const CATEGORIES = {
  culture: { name: "ثقافة",   icon: "bi-book",          cls: "cat-culture" },
  sport:   { name: "رياضة",   icon: "bi-trophy",        cls: "cat-sport" },
  music:   { name: "موسيقى",  icon: "bi-music-note-beamed", cls: "cat-music" },
  family:  { name: "عائلي",   icon: "bi-people",        cls: "cat-family" },
  tech:    { name: "تقنية",   icon: "bi-cpu",           cls: "cat-tech" },
  art:     { name: "فنون",    icon: "bi-palette",       cls: "cat-art" }
};

const EVENTS = [
  { id: 1, title: "هاكاثون SVU للبرمجة 2026", cat: "tech", date: "2026-10-23", time: "10:00 - 18:00",
    city: "دمشق", venue: "مركز النفاذ - المزة", img: "hackathon", featured: true, seats: 120,
    short: "24 ساعة من البرمجة والإبداع لحل تحديات حقيقية ضمن فرق طلابية.",
    desc: "يجمع هاكاثون الجامعة الافتراضية طلاب البرمجة والتصميم في تحدٍّ مفتوح لبناء حلول رقمية لمشكلات المجتمع المحلي. تتشكّل الفرق من 3 إلى 5 طلاب، ويرافقهم مرشدون من أعضاء الهيئة التدريسية وخبراء من سوق العمل. تُمنح جوائز لأفضل ثلاثة مشاريع، إضافة إلى شهادات مشاركة لجميع الفرق." },
  { id: 2, title: "أمسية شعرية: أصوات من الشام", cat: "culture", date: "2026-10-27", time: "18:30 - 20:30",
    city: "دمشق", venue: "دار الأسد للثقافة والفنون", img: "poetry", featured: true, seats: 300,
    short: "أمسية يلقي فيها طلاب وخريجو الجامعة قصائدهم بحضور نخبة من الشعراء.",
    desc: "تحتفي الأمسية بالمواهب الأدبية لدى طلاب الجامعة، حيث يقدّم عشرة مشاركين قصائد بالفصحى والمحكية، تتبعها جلسة حوارية مفتوحة مع لجنة تحكيم من الأدباء. يُختتم اللقاء بتوقيع مجموعة شعرية مشتركة صادرة عن نادي الأدب في الجامعة." },
  { id: 3, title: "دوري كرة القدم بين البرامج", cat: "sport", date: "2026-10-30", time: "16:00 - 19:00",
    city: "حمص", venue: "ملعب خالد بن الوليد", img: "football", featured: true, seats: 500,
    short: "مباريات حماسية بين فرق برامج الجامعة المختلفة للفوز بكأس الدوري.",
    desc: "يتنافس في الدوري ثمانية فرق تمثّل برامج الجامعة (المعلوماتية، الإعلام، الحقوق، الاقتصاد...). تُقام مباريات اليوم ضمن دور المجموعات، والدعوة مفتوحة لجميع الطلاب وعائلاتهم للتشجيع. يتوفر ركن للمشروبات ومنطقة ألعاب للأطفال." },
  { id: 4, title: "حفل موسيقي: نغمات الخريف", cat: "music", date: "2026-11-05", time: "19:00 - 21:30",
    city: "اللاذقية", venue: "المسرح القومي", img: "concert", featured: true, seats: 400,
    short: "فرقة الجامعة الموسيقية تقدّم باقة من الموشحات والأغاني الطربية.",
    desc: "تعزف فرقة الجامعة الافتراضية مع ضيوف من المعهد العالي للموسيقا برنامجاً متنوعاً يبدأ بالموشحات الحلبية ويمرّ بأعمال فيروز والرحابنة وينتهي بمقطوعات معاصرة من تأليف الطلاب. الدخول مجاني مع ضرورة الحجز المسبق." },
  { id: 5, title: "يوم العائلة المفتوح", cat: "family", date: "2026-11-08", time: "10:00 - 16:00",
    city: "دمشق", venue: "حديقة تشرين", img: "family-day", featured: false, seats: 800,
    short: "نشاطات ترفيهية وتعليمية للطلاب وعائلاتهم في الهواء الطلق.",
    desc: "يوم كامل من الأنشطة المشتركة: مسابقات للأطفال، ورسم على الوجوه، وركن للقراءة، ومسرح دمى، ونزهة جماعية. هدفنا تقريب مجتمع الجامعة من عائلات الطلاب وخلق مساحة للتعارف بعيداً عن الشاشات." },
  { id: 6, title: "ورشة الذكاء الاصطناعي التطبيقي", cat: "tech", date: "2026-11-12", time: "17:00 - 19:00",
    city: "أونلاين", venue: "منصة الجامعة التفاعلية", img: "ai-workshop", featured: true, seats: 250,
    short: "ورشة عملية لبناء أول نموذج تعلّم آلي باستخدام Python خطوة بخطوة.",
    desc: "تقدّم الورشة مدخلاً عملياً إلى تعلّم الآلة: تجهيز البيانات، وتدريب نموذج تصنيف بسيط، وتقييم دقته، ثم نشره كتطبيق ويب صغير. مناسبة لطلاب السنتين الثالثة والرابعة، ويُفضّل إحضار حاسب مثبّت عليه Python." },
  { id: 7, title: "معرض الفنون التشكيلية الطلابي", cat: "art", date: "2026-11-18", time: "11:00 - 19:00",
    city: "حلب", venue: "صالة الخانجي", img: "art-expo", featured: false, seats: 600,
    short: "أكثر من 60 لوحة ومنحوتة لطلاب الجامعة في معرض يستمر ثلاثة أيام.",
    desc: "يضم المعرض أعمالاً بأساليب مختلفة: الواقعية، والتجريد، والخط العربي، والفن الرقمي. تُخصّص مساحة لورشات رسم حيّة يومياً عند الساعة الخامسة، ويُعرض جزء من الأعمال للبيع لدعم صندوق المنح الطلابية." },
  { id: 8, title: "ماراثون الجامعة الخيري", cat: "sport", date: "2026-11-27", time: "08:00 - 11:00",
    city: "دمشق", venue: "ساحة الأمويين", img: "marathon", featured: false, seats: 1000,
    short: "سباق جري لمسافة 5 و10 كم يعود ريعه لدعم الطلاب المحتاجين.",
    desc: "ماراثون مفتوح للطلاب والخريجين والكادر وعائلاتهم، بمسارين: 5 كم للهواة و10 كم للمحترفين. رسوم المشاركة رمزية، ويُخصّص كامل الريع لصندوق دعم الطلاب. يحصل كل مشارك على قميص وميدالية إتمام." },
  { id: 9, title: "حفل تخريج دفعة 2026", cat: "family", date: "2026-12-10", time: "16:00 - 19:00",
    city: "دمشق", venue: "قصر المؤتمرات", img: "graduation", featured: false, seats: 1500,
    short: "الاحتفال الرسمي بتخريج طلاب الدورة الحالية بحضور الأهالي.",
    desc: "يشهد الحفل تسليم الشهادات لخريجي جميع البرامج، وكلمات لرئاسة الجامعة وممثلي الخريجين، وتكريم المتفوقين. يُسمح لكل خريج بدعوة ثلاثة ضيوف، ويُبث الحفل مباشرة عبر صفحات الجامعة." },
  { id: 10, title: "ليلة السينما السورية", cat: "art", date: "2026-10-15", time: "19:00 - 22:00",
    city: "حمص", venue: "سينما الكندي", img: "film-night", featured: false, seats: 200,
    short: "عرض أفلام قصيرة من إنتاج طلاب الإعلام تليه جلسة نقاش.",
    desc: "تعرض الليلة خمسة أفلام قصيرة أنتجها طلاب برنامج الإعلام خلال الفصل الماضي، يعقبها نقاش مع المخرجين الشباب حول تجربة الإنتاج بميزانيات محدودة." }
];

/* أسماء الأشهر */
const MONTHS = ["كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران",
  "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"];
const DAYS = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

/* ---------- 2) أدوات مساعدة ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// Date بالتوقيت المحلي
function toDate(str) { const [y, m, d] = str.split("-").map(Number); return new Date(y, m - 1, d); }
function today() { const t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); }
function daysFromToday(str) { return Math.round((toDate(str) - today()) / 86400000); }
function formatDate(str) { const d = toDate(str); return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; }

// localStorage قد يكون غير متاح في بعض المتصفحات، لذلك نغلّفه بـ try/catch
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* تجاهل */ } }
};

//  الحالة: "اليوم" / "قريباً" / "انتهت"
function statusBadge(ev) {
  const diff = daysFromToday(ev.date);
  if (diff === 0) return '<span class="badge bg-danger status-badge"><i class="bi bi-broadcast"></i> الحدث اليوم</span>';
  if (diff > 0 && diff <= 7) return '<span class="badge bg-warning text-dark status-badge"><i class="bi bi-lightning-charge"></i> هذا الأسبوع</span>';
  if (diff < 0) return '<span class="badge bg-secondary status-badge">انتهت</span>';
  return "";
}

// إنشاء بطاقة فعالية (Bootstrap Card) — تُستخدم في أكثر من صفحة
function eventCard(ev, colClass = "col-sm-6 col-lg-4") {
  const c = CATEGORIES[ev.cat], d = toDate(ev.date);
  return `
  <div class="${colClass} reveal">
    <article class="card event-card">
      <div class="thumb">
        <img src="assets/img/events/${ev.img}.svg" alt="${ev.title}" loading="lazy">
        <span class="badge badge-cat ${c.cls}"><i class="bi ${c.icon}"></i> ${c.name}</span>
        ${statusBadge(ev)}
        <div class="date-chip"><b>${d.getDate()}</b><span>${MONTHS[d.getMonth()]}</span></div>
      </div>
      <div class="card-body d-flex flex-column">
        <h3 class="card-title">${ev.title}</h3>
        <div class="event-meta mb-2">
          <span class="me-3"><i class="bi bi-geo-alt-fill"></i> ${ev.city}</span>
          <span><i class="bi bi-clock-fill"></i> ${ev.time}</span>
        </div>
        <p class="card-text text-muted small flex-grow-1">${ev.short}</p>
        <a href="event.html?id=${ev.id}" class="btn btn-outline-primary btn-sm align-self-start">التفاصيل <i class="bi bi-arrow-left"></i></a>
      </div>
    </article>
  </div>`;
}

// إظهار تنبيه 
function showAlert(container, type, html) {
  container.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${html}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="إغلاق"></button>
    </div>`;
}

// التحقق من صيغة البريد الإلكتروني
const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/* ---------- وظائف مشتركة لكل الصفحات ---------- */
function initCommon() {
  // الوضع الليلي: تبديل صنف CSS وحفظ الاختيار
  const btn = $("#themeToggle");
  const apply = dark => {
    document.body.classList.toggle("dark", dark);
    if (btn) btn.innerHTML = dark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
  };
  apply(store.get("theme") === "dark");
  btn?.addEventListener("click", () => {
    const dark = !document.body.classList.contains("dark");
    apply(dark); store.set("theme", dark ? "dark" : "light");
  });

  // زر العودة للأعلى
  const toTop = $("#toTop");
  window.addEventListener("scroll", () => toTop?.classList.toggle("show", window.scrollY > 400));
  toTop?.addEventListener("click", () => window.scrollTo({ top: 0 }));

  // السنة الحالية في التذييل
  $$(".year").forEach(el => el.textContent = new Date().getFullYear());

  // تأثير الظهور عند التمرير
  observeReveal();
}

// IntersectionObserver يضيف الصنف visible عند ظهور العنصر
let revealObserver;
function observeReveal() {
  if (!("IntersectionObserver" in window)) { $$(".reveal").forEach(e => e.classList.add("visible")); return; }
  revealObserver = revealObserver || new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visible"); revealObserver.unobserve(en.target); } });
  }, { threshold: .12 });
  $$(".reveal:not(.visible)").forEach(e => revealObserver.observe(e));
}

/* ---------- الصفحة الرئيسية ---------- */
function initHome() {
  // سلايدر الفعاليات البارزة
  const featured = EVENTS.filter(e => e.featured && daysFromToday(e.date) >= 0);
  const list = featured.length ? featured : EVENTS.filter(e => e.featured);
  const track = $("#slides"), dots = $("#sliderDots");
  track.innerHTML = list.map(ev => `
    <div class="slide">
      <img src="assets/img/events/${ev.img}.svg" alt="${ev.title}">
      <div class="slide-caption">
        <span class="badge badge-cat ${CATEGORIES[ev.cat].cls}">${CATEGORIES[ev.cat].name}</span>
        <h3>${ev.title}</h3>
        <p class="mb-2 small"><i class="bi bi-calendar-event"></i> ${formatDate(ev.date)} — <i class="bi bi-geo-alt"></i> ${ev.venue}</p>
        <a href="event.html?id=${ev.id}" class="btn btn-accent btn-sm">احجز مكانك</a>
      </div>
    </div>`).join("");
  dots.innerHTML = list.map((_, i) => `<button aria-label="شريحة ${i + 1}"></button>`).join("");

  let index = 0, timer;
  const go = i => {
    index = (i + list.length) % list.length;
    track.style.transform = `translateX(${index * 100}%)`; // موجب لأن الاتجاه RTL
    $$("button", dots).forEach((d, k) => d.classList.toggle("active", k === index));
  };
  const auto = () => { clearInterval(timer); timer = setInterval(() => go(index + 1), 5000); };
  $("#nextSlide").addEventListener("click", () => { go(index + 1); auto(); });
  $("#prevSlide").addEventListener("click", () => { go(index - 1); auto(); });
  $$("button", dots).forEach((d, k) => d.addEventListener("click", () => { go(k); auto(); }));
  // إيقاف مؤقت عند مرور الماوس
  $("#slider").addEventListener("mouseenter", () => clearInterval(timer));
  $("#slider").addEventListener("mouseleave", auto);
  go(0); auto();

  // ب) أزرار التصنيفات مع عدد الفعاليات لكل تصنيف
  $("#categories").innerHTML = Object.entries(CATEGORIES).map(([key, c]) => {
    const n = EVENTS.filter(e => e.cat === key).length;
    return `<div class="col-6 col-md-4 col-lg-2 reveal">
      <a class="cat-btn" href="events.html?cat=${key}">
        <i class="bi ${c.icon} text-${key}"></i>${c.name}
        <span class="badge rounded-pill ${c.cls}">${n} فعاليات</span>
      </a></div>`;
  }).join("");

  // أحدث الفعاليات القادمة (6 بطاقات مرتبة حسب التاريخ)
  const upcoming = EVENTS.filter(e => daysFromToday(e.date) >= 0).sort((a, b) => toDate(a.date) - toDate(b.date)).slice(0, 6);
  $("#latestEvents").innerHTML = upcoming.map(ev => eventCard(ev)).join("");

  // عداد إحصائيات بسيط
  $("#statEvents").textContent = EVENTS.length;
  $("#statCities").textContent = new Set(EVENTS.map(e => e.city)).size;
  $("#statUpcoming").textContent = upcoming.length;
  observeReveal();
}

/* ---------- صفحة كل الفعاليات (بحث + فلترة) ---------- */
function initEvents() {
  const search = $("#fSearch"), cat = $("#fCat"), city = $("#fCity"), when = $("#fWhen"), sort = $("#fSort");
  const grid = $("#eventsGrid"), count = $("#resultCount");

  // تعبئة قوائم الاختيار من البيانات
  cat.innerHTML += Object.entries(CATEGORIES).map(([k, c]) => `<option value="${k}">${c.name}</option>`).join("");
  city.innerHTML += [...new Set(EVENTS.map(e => e.city))].map(c => `<option>${c}</option>`).join("");

  // أولوية التصنيف: رابط ?cat= ثم التفضيل المحفوظ في localStorage
  const urlCat = new URLSearchParams(location.search).get("cat");
  const saved = store.get("preferredCat");
  if (urlCat && CATEGORIES[urlCat]) cat.value = urlCat;
  else if (saved && CATEGORIES[saved]) cat.value = saved;

  function render() {
    const q = search.value.trim().toLowerCase();
    let list = EVENTS.filter(ev => {
      const d = daysFromToday(ev.date);
      const matchQ = !q || (ev.title + ev.short + ev.venue).toLowerCase().includes(q);
      const matchCat = !cat.value || ev.cat === cat.value;
      const matchCity = !city.value || ev.city === city.value;
      const matchWhen = when.value === "all" ? true
        : when.value === "today" ? d === 0
        : when.value === "week" ? d >= 0 && d <= 7
        : when.value === "month" ? d >= 0 && d <= 30
        : when.value === "upcoming" ? d >= 0
        : d < 0; // past
      return matchQ && matchCat && matchCity && matchWhen;
    });
    list.sort((a, b) => sort.value === "asc" ? toDate(a.date) - toDate(b.date) : toDate(b.date) - toDate(a.date));

    count.textContent = list.length;
    grid.innerHTML = list.length ? list.map(ev => eventCard(ev)).join("") :
      `<div class="col-12 empty-state"><i class="bi bi-calendar-x"></i><p class="mt-2">لا توجد فعاليات مطابقة. جرّب تغيير خيارات الفلترة.</p></div>`;
    observeReveal();
  }

  [search, city, when, sort].forEach(el => el.addEventListener("input", render));
  cat.addEventListener("change", () => { store.set("preferredCat", cat.value); render(); }); // حفظ التفضيل
  $("#resetFilters").addEventListener("click", () => {
    search.value = ""; cat.value = ""; city.value = ""; when.value = "upcoming"; sort.value = "asc";
    store.set("preferredCat", ""); render();
  });
  render();
}

/* ---------- صفحة تفاصيل الفعالية ---------- */
function initEvent() {
  const id = Number(new URLSearchParams(location.search).get("id")) || 1;
  const ev = EVENTS.find(e => e.id === id) || EVENTS[0];
  const c = CATEGORIES[ev.cat];
  document.title = `${ev.title} | دليل فعاليات SVU`;

  $("#evTitle").textContent = ev.title;
  $("#evCrumb").textContent = ev.title;
  $("#evBadge").innerHTML = `<span class="badge badge-cat ${c.cls}"><i class="bi ${c.icon}"></i> ${c.name}</span>`;
  $("#evCover").src = `assets/img/events/${ev.img}.svg`;
  $("#evCover").alt = ev.title;
  $("#evShort").textContent = ev.short;
  $("#evDesc").textContent = ev.desc;
  $("#evDate").textContent = formatDate(ev.date);
  $("#evTime").textContent = ev.time;
  $("#evVenue").textContent = `${ev.venue} — ${ev.city}`;
  $("#evSeats").textContent = `${ev.seats} مقعد`;
  $("#mapCaption").textContent = ev.venue;

  // حالة الفعالية
  const diff = daysFromToday(ev.date);
  $("#evStatus").innerHTML = diff < 0 ? '<span class="badge bg-secondary">انتهت هذه الفعالية</span>'
    : diff === 0 ? '<span class="badge bg-danger">الحدث اليوم!</span>'
    : diff === 1 ? '<span class="badge bg-success">تبدأ غداً</span>'
    : diff === 2 ? '<span class="badge bg-success">تبدأ بعد يومين</span>'
    : `<span class="badge bg-success">تبدأ بعد ${diff} ${diff <= 10 ? "أيام" : "يوماً"}</span>`;
  if (diff < 0) { $("#bookBtn").disabled = true; $("#bookBtn").textContent = "انتهى الحجز"; }

  // معرض صور صغير + Modal لعرض الصورة مكبّرة
  const gallery = [1, 2, 3].map(n => `assets/img/gallery/${ev.img}-${n}.svg`);
  $("#evGallery").innerHTML = gallery.map((src, i) => `
    <div class="col-4"><img src="${src}" alt="صورة ${i + 1} من ${ev.title}" data-bs-toggle="modal" data-bs-target="#imgModal" data-src="${src}"></div>`).join("");
  $$("#evGallery img").forEach(img => img.addEventListener("click", () => $("#imgModalSrc").src = img.dataset.src));

  // زر "أضف للتقويم": ينشئ ملف .ics يفتح في أي تطبيق تقويم
  $("#calBtn").addEventListener("click", () => {
    const [start, end] = ev.time.split("-").map(s => s.trim().replace(":", "") + "00");
    const day = ev.date.replace(/-/g, "");
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//SVU Events//AR", "BEGIN:VEVENT",
      `UID:svu-event-${ev.id}@svu-events`, `DTSTART:${day}T${start}`, `DTEND:${day}T${end}`,
      `SUMMARY:${ev.title}`, `LOCATION:${ev.venue} - ${ev.city}`, `DESCRIPTION:${ev.short}`,
      "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    a.download = `event-${ev.id}.ics`;
    a.click();
    showAlert($("#actionAlert"), "success", '<i class="bi bi-calendar-check"></i> تم تنزيل ملف التقويم، افتحه لإضافة الفعالية.');
  });

  // زر "شارك": يستخدم Web Share API إن توفرت وإلا ينسخ الرابط
  $("#shareBtn").addEventListener("click", async () => {
    const data = { title: ev.title, text: ev.short, url: location.href };
    try {
      if (navigator.share) { await navigator.share(data); return; }
      await navigator.clipboard.writeText(location.href);
      showAlert($("#actionAlert"), "info", '<i class="bi bi-link-45deg"></i> تم نسخ رابط الفعالية، يمكنك مشاركته الآن.');
    } catch (e) {
      showAlert($("#actionAlert"), "warning", "تعذّر المشاركة تلقائياً، انسخ الرابط من شريط العنوان.");
    }
  });

  // فعاليات ذات صلة: نفس التصنيف أولاً ثم الأقرب تاريخاً
  const related = EVENTS.filter(e => e.id !== ev.id)
    .sort((a, b) => (b.cat === ev.cat) - (a.cat === ev.cat) || Math.abs(daysFromToday(a.date)) - Math.abs(daysFromToday(b.date)))
    .slice(0, 3);
  $("#relatedEvents").innerHTML = related.map(e => eventCard(e, "col-md-4")).join("");

  // Modal الحجز الوهمي مع التحقق من الحقول
  const form = $("#bookForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#bName"), email = $("#bEmail"), n = $("#bCount");
    let ok = true;
    [[name, name.value.trim().length >= 3], [email, isEmail(email.value)], [n, n.value >= 1 && n.value <= 5]]
      .forEach(([el, valid]) => { el.classList.toggle("is-invalid", !valid); el.classList.toggle("is-valid", valid); if (!valid) ok = false; });
    if (!ok) { showAlert($("#bookAlert"), "danger", "يرجى تصحيح الحقول المظللة بالأحمر."); return; }
    const code = "SVU-" + ev.id + "-" + Math.floor(1000 + Math.random() * 9000);
    showAlert($("#bookAlert"), "success", `<b>تم الحجز بنجاح!</b> رقم حجزك: <span dir="ltr">${code}</span> — ${n.value} مقعد في "${ev.title}".`);
    form.reset(); $$(".is-valid", form).forEach(el => el.classList.remove("is-valid"));
  });
  observeReveal();
}

/* ---------- صفحة اتصل بنا: التحقق من النموذج ---------- */
function initContact() {
  const form = $("#contactForm"), alertBox = $("#formAlert");
  const fields = {
    cName:    { test: v => v.trim().length >= 3,  msg: "الاسم مطلوب (3 أحرف على الأقل)" },
    cEmail:   { test: v => isEmail(v),            msg: "صيغة البريد الإلكتروني غير صحيحة" },
    cSubject: { test: v => v !== "",              msg: "اختر موضوع الرسالة" },
    cMessage: { test: v => v.trim().length >= 10, msg: "الرسالة قصيرة جداً (10 أحرف على الأقل)" }
  };

  // تحقق فوري أثناء الكتابة بعد أول محاولة إرسال
  let tried = false;
  const validate = id => {
    const el = $("#" + id), ok = fields[id].test(el.value);
    el.classList.toggle("is-invalid", !ok);
    el.classList.toggle("is-valid", ok);
    return ok;
  };
  Object.keys(fields).forEach(id => $("#" + id).addEventListener("input", () => tried && validate(id)));

  // عدّاد أحرف الرسالة
  $("#cMessage").addEventListener("input", e => $("#charCount").textContent = e.target.value.length);

  form.addEventListener("submit", e => {
    e.preventDefault();
    tried = true;
    const errors = Object.keys(fields).filter(id => !validate(id)).map(id => fields[id].msg);
    if (errors.length) {
      showAlert(alertBox, "danger", `<b><i class="bi bi-exclamation-triangle"></i> لم يتم الإرسال:</b><ul class="mb-0 mt-1">${errors.map(m => `<li>${m}</li>`).join("")}</ul>`);
      return;
    }
    const name = $("#cName").value.trim();
    showAlert(alertBox, "success", `<b><i class="bi bi-check-circle"></i> شكراً ${name}!</b> وصلت رسالتك وسنرد عليك خلال 48 ساعة.`);
    form.reset(); tried = false;
    $$(".is-valid", form).forEach(el => el.classList.remove("is-valid"));
    $("#charCount").textContent = 0;
  });
}

/* ---------- تشغيل منطق الصفحة الحالية ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initCommon();
  const pages = { home: initHome, events: initEvents, event: initEvent, contact: initContact };
  pages[document.body.dataset.page]?.();
});

// دالة لحقن الهيدر و الغوتير
document.addEventListener("DOMContentLoaded", () => {
  // تطبيق الثيم المحفوظ مسبقاً فور تحميل الصفحة
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }

  // دالة تحميل الهيدر والفوتر
  async function loadComponent(id, file) {
    try {
      let response = await fetch(file);
      if (response.ok) {
        let html = await response.text();
        document.getElementById(id).innerHTML = html;
        
        // تحديث الأيقونة فور تحميل الهيدر إذا كان الوضع الليلي مفعلاً
        if (id === "header-placeholder" && document.body.classList.contains('dark')) {
          updateIcon('dark');
        }
      }
    } catch (error) {
      console.error(`Error loading ${file}:`, error);
    }
  }

  loadComponent("header-placeholder", "header.html");
  loadComponent("footer-placeholder", "footer.html");

  // تفعيل تبديل الثيم فور النقر على الزر
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("#themeToggle");
    if (!btn) return;

    // تبديل صنف dark على الـ body مباشرة
    document.body.classList.toggle('dark');
    
    // التحقق من الحالة الجديدة وحفظها
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    updateIcon(isDark ? 'dark' : 'light');
  });

  // دالة لتغيير الأيقونة
  function updateIcon(theme) {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars';
    }
  }
});