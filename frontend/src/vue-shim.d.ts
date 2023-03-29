// fixes https://github.com/vuejs/vue-cli/issues/1198
declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
