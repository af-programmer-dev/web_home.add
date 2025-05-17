<script>
  const startButton = document.querySelector('.btn-start');

  startButton.addEventListener('click', async function () {
    const selectedTopics = Array.from(document.querySelectorAll('input[name="mavzu"]:checked')).map(cb => cb.value);
    const testCount = parseInt(document.getElementById("testCount").value);

    if (selectedTopics.length === 0) {
      alert("Kamida 1 ta mavzu tanlang!");
      return;
    } else if (selectedTopics.length > 3) {
      alert("Faqat 3 ta mavzuni tanlang!");
      return;
    }

    let allTests = [];

    for (let topic of selectedTopics) {
      const fileName = topic.toLowerCase()
        .replace(/ /g, '_')  // Bo'sh joyni _ ga almashtiradi
        .replace(/[’']/g, '') + '.json';  // apostrof va qo‘shtirnoqlardan tozalaydi

      try {
        const response = await fetch(`tests/${fileName}`);
        const data = await response.json();
        allTests = allTests.concat(data);
      } catch (error) {
        console.error(`Faylni o'qib bo'lmadi: ${fileName}`);
      }
    }

    // Testlarni aralashtiramiz
    allTests.sort(() => Math.random() - 0.5);

    // Belgilangan sondagilarni olamiz
    const selectedTests = allTests.slice(0, testCount);

    // LocalStorage orqali keyingi sahifaga yuboramiz
    localStorage.setItem('selectedTests', JSON.stringify(selectedTests));

    // Test sahifasiga o'tamiz
    window.location.href = 'test.html';
  });
</script>
