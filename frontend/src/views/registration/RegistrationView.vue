<template>
  <div>
    <LogoComponent />
    <RegistrationForm/>
    <LanguageSelect />
  </div>
</template>
  
<script lang="ts" setup>
import LanguageSelect from '@/components/common/LanguageSelect.vue'
import RegistrationForm from '@/components/registration/RegistrationForm.vue';
import LogoComponent from "@/components/common/LogoComponent.vue";
</script>
