<template>
  <div class="podcast-info text-center text-green-500">
    <h1 class="text-4xl font-bold mb-4">{{ title }}</h1>
    <p class="text-xl text-gray-950">{{ description }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Story podcast',
      description: 'Двa андроїдщики, два Вови і деколи дві різні думки. Кожний подкаст ми обговорюємо нові релізи в світі android розробки, кращі і не дуже практики. Ділимося своїми думками, досвідом і деколи пробуємо не смішно жатрувати. Також тут ви знайдете рекомендації початківцям, а хто давно в розробці мають тут просто гарно провести час.'
    }
  }
}
</script>

<style scoped>
.podcast-info {
  text-align: center;
}

.podcast-info h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.podcast-info p {
  font-size: 1.2em;
}
</style>