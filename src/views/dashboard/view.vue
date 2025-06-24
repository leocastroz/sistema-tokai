<template>
	<div>
		<div>
			<div class="flex items-center justify-start max-w-fit p-1">
				<div>
					<img src="/img/confete.gif" alt="confete" width="50">
				</div>
				<div class="animate__animated animate__fadeIn">
					<p class="text-xl font-extrabold text-white">BOAS-VINDAS</p>
					<p class="text-[13px]  text-gray-400">{{ account?.data.session.user.email }}</p>
				</div>
			</div>
			<!-- <div class="bg-green-400 border border-green-600 flex max-w-fit gap-5 p-2 mt-3 items-center justify-between rounded-md">
				Sistema
				<div class="text-black w-20 py-1 rounded bg-green-200 text-[11px] border border-green-500 items-center justify-center flex">
					
					<i class="fa-solid fa-lock"></i>
					<p class="px-1">
						{{ account?.data.session.user.user_metadata.type_plan }}
					</p>
				</div>
			</div> -->
		</div>
		<!-- DASHBOARD BASEADO NO TIPO DO PLANO DO USUÁRIO -->
    <div v-if="account?.data.session.user.user_metadata.type_plan === 'posto ' || account?.data.session.user.user_metadata.type_plan === 'frentista'" class="animate__animated animate__fadeIn">
			<postorota />
		</div>
    <div v-if="account?.data.session.user.user_metadata.type_plan === 'enterprise'" class="animate__animated animate__fadeIn">
			<galeradapa />
		</div>
		<!-- <div v-if="account?.data.session.user.user_metadata.type_plan === 'admin'" class="animate__animated animate__fadeIn">
			<admin />
		</div> -->
		<div v-if="account?.data.session.user.user_metadata.type_plan === 'coach'" class="animate__animated animate__fadeIn">
			<coach />
		</div>
		<div v-if="account?.data.session.user.user_metadata.type_plan === 'florist'"
			class="animate__animated animate__fadeIn">
			<florist />
		</div>
		<!-- <div v-if="account?.data.session.user.user_metadata.type_plan === 'elementar'"
			class="animate__animated animate__fadeIn">
			<medical />
		</div> -->
	</div>
	<alert v-if="false" />
</template>

<script setup>
import galeradapa from '@/components/dashboard-plans/galeradapa.vue';
import florist from '@/components/dashboard-plans/florist.vue';
import postorota from '@/components/dashboard-plans/postorota.vue';
import admin from '@/components/dashboard-plans/admin.vue';
import coach from '@/components/dashboard-plans/coach.vue';
import { supabase } from '@/clients/supabase';
import alert from '@/components/alert.vue';
import { ref, reactive } from 'vue';

let sessionData_plano = reactive({ data_plano: '' });  // --- devem ser reativo

// PEGANDO SESSÃO COM AUTH
const account = ref();
const getSession = async () => {
	const currentDate = new Date().toISOString();
	let { data, error } = await supabase.auth.getSession();
	account.value = await supabase.auth.getSession();
	sessionData_plano = data.session.user.user_metadata.data_plano;  // --- devem ser reativos

	console.log(sessionData_plano)
	// --------------- FILTRO DE DATA PARA FINALIZAR PLANO ---------------
	if (currentDate >= sessionData_plano) {
		console.log('MAIOR OU IGUAL A DATA ATUAL', sessionData_plano)
	}
	else {
		console.log('TESTE')
	}
}
getSession();
</script>
