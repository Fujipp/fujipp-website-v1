setup(Vt) {
    const { public: I } = L(); // โหลดค่า public จาก L() ซึ่งใช้สำหรับการกำหนด URL ของ API ของเซิร์ฟเวอร์ Discord

    const $ = d([/*... รายการข้อมูลผู้ใช้ ...*/]); // โหลดข้อมูลผู้ใช้จาก API

    const A = d([/*... รายการข้อมูลบอท ...*/]); // โหลดข้อมูลบอทจาก API

    const h = d(null); // รักษาข้อมูลของบอทหลัก

    const B = d([]); // รายการบอทสำหรับแสดงบนเว็บไซต์

    const S = d([/*... รายการบอท ...*/]); // รายการบอทสำหรับแสดงบนเว็บไซต์

    // โหลดข้อมูลผู้ใช้และบอทจาก API ของ Discord
    async function P() {
        // โหลดข้อมูลผู้ใช้จาก API
        const { status: r, results: n, message: i } = await fetch(`${I.API_BASE_API}/api/v1/users`)
            .then((s) => s.json())
            .catch((s) => s.response || {
                status: 500,
                data: {
                    status: "error",
                    message: "Internal Server Error",
                },
            });

        if (r !== 200) {
            console.log(`%c ${i}`, "color: #ff0000");
            return;
        }

        // กรองข้อมูลผู้ใช้และบอท
        const t = n.filter((s) => !s.bot && s.id != "847770564525162546"); // ผู้ใช้
        h.value = n.find((s) => s.bot && s.id == "847770564525162546"); // บอทหลัก

        for (const s of t) {
            const z = $.value.find((g) => g.userId === s.id);
            if (z) {
                z.profile = s; // อัพเดตข้อมูลผู้ใช้
            }
        }

        // กรองข้อมูลบอท
        const j = n.filter((s) => s.bot && s.id != "847770564525162546");
        for (const s of j) {
            if (S.value.map((m) => m.userId).includes(s.id)) {
                var c = S.value.find((m) => m.userId === s.id);
                if (c) {
                    c = { ...s };
                    return;
                }
            }
            // ค้นหาลิงก์ Invite สำหรับบอท
            const g = A.value.find((m) => m.userId === s.id);
            B.value.push({
                userId: s.id,
                profile: s,
                link: g
                    ? g.link
                    : `https://discord.com/oauth2/authorize?client_id=${s.id}&permissions=1479548984&scope=applications.commands%20bot`,
            });
        }
    }

    // ฟังก์ชันอัพเดตข้อมูลผู้ใช้และบอท
    const _ = d(null);
    function M() {
        _.value && clearInterval(_.value);
        _.value = setInterval(() => {
            try {
                particlesJS.load("particles-js", "./assets/javascript/particles.json", function () {
                    console.log("callback - particles.js config loaded");
                });
                clearInterval(_.value);
            } catch {}
        }, 100);
    }

    return {
        // ส่วนอื่น ๆ ของ Vue.js component
    };
}
