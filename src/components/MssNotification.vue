
<script>
import { notify } from '@kyvg/vue3-notification';

export default {
    name: "MssNotification",
}
</script>

<style>

.custom-notification {
    color: white;
    padding: 1rem;
    margin: 0.3rem;
}

.custom-notification.success {
    background: rgba(0, 200, 0, 0.800);
    border-radius: 15px;
}

.custom-notification.error {
    background: rgba(200, 0, 0, 0.800);
    border-radius: 15px;
}

.custom-notification.info {
    background: rgba(0, 0, 200, 0.800);
    border-radius: 15px;
}
</style>

<template>
    <div class="notification-wrapper">
        <!--<notifications group="auth" position="bottom right" /> -->
        <notifications group="default">
            <template #body="props">
                <div class="custom-notification" :class="[props.item.type]">
                    <div class="title">
                        <fa-icon :icon="['fas', props.item.data.icon]" />
                        {{ props.item.title }}
                    </div>
                    <div class="content">
                        <span v-html="props.item.text" />
                    </div>
                </div>
            </template>
        </notifications>
    </div>
</template>
