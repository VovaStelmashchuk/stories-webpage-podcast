<script setup lang="ts">

const props = defineProps({
  slug: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  addNewOnEnter: {
    type: Boolean,
    default: false
  }
});

const editPodcastStore = useEditPodcastStore();

const charter = computed(() => {
  return editPodcastStore.getPodcastCharter(props.slug, props.index);
});

const timeSplit = charter.value.time.split(':');

const hour = ref(timeSplit[0]);
const minute = ref(timeSplit[1]);
const second = ref(timeSplit[2]);

watch([hour, minute, second], () => {
  editPodcastStore.updateLocalCharterTime(
      props.slug,
      props.index,
      `${hour.value}:${minute.value}:${second.value}`
  );
});

const isLast = computed(() => {
  return props.index === editPodcastStore.getPodcastBySlug(props.slug).charters.length - 1;
});

const inputKey = `charter-${props.slug}-${props.index}-description`;

defineShortcuts({
  enter: {
    usingInput: inputKey,
    handler: () => {
      if (props.addNewOnEnter) {
        editPodcastStore.addLocalCharter(props.slug);
      }
    }
  }
});

</script>

<template>
  <div class="flex-row flex gap-3">
    <UInput color="gray" v-model="hour" label="Hour" size="lg" class="w-20"/>
    <UInput color="gray" v-model="minute" label="Minus" size="lg" class="w-20"/>
    <UInput color="gray" v-model="second" label="Second" size="lg" class="w-20"/>
    <UInput color="gray" v-model="charter.description" label="Description" size="lg" class="w-full"
            :name="inputKey">
      <template #trailing v-if="isLast">
        <UKbd>Enter</UKbd>
      </template>
    </UInput>
  </div>
</template>

<style scoped>

</style>
