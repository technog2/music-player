<script setup lang="ts">
import { 
	ref, 
	watch, 
	onMounted,
} from 'vue';
import { useRouter }    from 'vue-router';
import { useApi }       from '@/assets/ts/Api';
import { useDom }       from '@/assets/ts/Dom';
import { useAuthStore } from '@/stores/Auth'
import SimpleButton     from '@/components/SimpleButton.vue';

const router         = useRouter();
const api            = useApi();
const dom            = useDom();
const authStore      = useAuthStore();
const step           = ref<number>(0);
const phone          = ref<string>('');
const verificationId = ref<string>();
const code           = ref<string[]>([]);
const loading        = ref<boolean>(false);
const error          = ref<string | null>();

watch(phone, (str: string) => 
	/^09\d{9}$/.test(str) ? 
		error.value = null : 
		error.value = 'Cellphone number is not valid.'
);

onMounted(() => {
	delay();
	dom.focus('phone-input');
});

async function submitPhone() {
	try {
		const res = await api.post(
			'/auth/verification', 
			{ cellphone: phone.value }, 
			{ loadingVar: loading }
		);

		if (res.ok) {
			verificationId.value = res.data.verificationId;
			step.value++;
			await delay();
			dom.focus('index-1');
		}
	}
	catch(err) { console.error(err); }
}

async function submitCode() {
	try {
		const res = await api.post(
			'/auth/login', 
			{ 
				code:           code.value.join(''),
				verificationId: verificationId.value,
			}, 
			{ loadingVar: loading }
		);

		if (res.ok) {
			authStore.setToken(res.data);
			router.push('/');
		}
	}
	catch(err) { console.error(err); }
}

async function goNext(index: number) {
	if (index === 5) await submitCode();
	else dom.focus(`index-${index + 1}`);
}

function delay(n?: number = 500) {
	return new Promise(r => setTimeout(r, n));
}
</script>

<template>
	<div class="bg-[url('/src/assets/images/bg.png')] bg-no-repeat bg-center bg-cover">
		<form 
			v-if="step === 0" 
			@submit.prevent="submitPhone"
			class=""
		>
			<div class="text-center px-14 pt-28">
				<h2 class="text-white font-bold text-3xl">Cellphone</h2>
				<p class="text-gray-300 mt-4">Please perform your country code and enter your cellphone number.</p>
			</div>
			<div class="pt-20 px-10">
				<input 
					v-model="phone"
					type="text" 
					id="phone-input" 
					placeholder="Phone number" 
					class="w-full bg-transparent border-[1.5px] border-gray-700 rounded-xl px-4 py-2 outline-none" 
					required 
				/>
				<span v-if="error" class="text-error text-sm mt-2 transition">{{ error }}</span>
				<SimpleButton
					:loading="loading"
					value="Continue"
				/>
			</div>
		</form>
		<form 
			v-else
			@submit.prevent="submitCode" 
			class=""
		>
			<div class="text-center px-14 pt-28">
				<h2 class="text-white font-bold text-3xl">Perform</h2>
				<p class="text-gray-300 mt-4">Enter the validation code sent to the phone number "{{ phone }}"</p>
			</div>
			<div class="pt-20 px-10">
				<div class="flex gap-2 mt-2" dir="ltr">
					<input 
						v-for="index in 5"
						v-model="code[index]"
						@keyup="goNext(index)"
						:id="`index-${index}`"
						type="text" 
						class="bg-transparent border-[1.5px] border-gray-700 rounded-xl p-2 w-full text-center outline-none" 
						maxlength="1" 
						required 
					/>
				</div>
				<SimpleButton
					:loading="loading"
					value="Login"
					class="mt-4"
				/>
			</div>
		</form>
	</div>
</template>
