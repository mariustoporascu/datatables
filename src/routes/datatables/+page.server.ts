import { redirect } from '@sveltejs/kit';
 
export const load = ({ locals }) => {
        throw redirect(307, '/datatables/basic');
}