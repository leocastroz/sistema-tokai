// import { BeakerIcon } from '@heroicons/vue/24/solid'
import DashboardIcon from "../assets/dashboard.svg";
import TicketIcon from "../assets/ticket.svg";
import StarIcon from "../assets/star.svg";
import CubeIcon from "../assets/cube.svg";
import WalletIcon from "../assets/wallet.svg";
import ToDoIcon from "../assets/todo.svg";
import ClientesIcon from "../assets/clientes.svg";
import ConfigIcon from "../assets/config.svg";

export default {
  // EMPRESA-GALERADAPA263
  user: [
    { name: "Dashboard", to: "/dashboard", icon: DashboardIcon },
    { name: "Produtos 1", to: "/produtos-galera-da-pa", icon: CubeIcon },

    // { name: "Marca", to: "/marca", icon: TicketIcon },
    { name: "Clientes", to: "/cliente", icon: ClientesIcon },
    // { name: "MovImentos", to: "/movimentos", icon: ClientesIcon },
    // { name: "MovImentos", to: "/movimentos", icon: ClientesIcon },
    // { name: "Carteira", to: "/carteira", icon: "fa-solid fa-wallet" },
    // { name: "Produtos 2", to: "/produtos", icon: "fa-solid fa-gift" },
    // { name: "Alunos(a)", to: "/aluno", icon: "fa-solid fa-graduation-cap" },
    // { name: "Reuniões", to: "/reunioes", icon: "fa-solid fa-handshake-simple" },
    { name: "Configurações", to: "/configuracoes", icon: ConfigIcon },
    // { name: "Suporte - BROEX", to: "/suporte", icon: ConfigIcon },
  ],
  admin: [{ name: "GitHub", to: "/github", icon: ClientesIcon }],
  admin: [
    { name: "Dashboard", to: "/dashboard", icon: DashboardIcon },
    { name: "Cadastro", to: "/professor", icon: "fa-solid fa-chart-line" },
  ],
  essencial: [],
  // TOKAI - 2025
  // elementar: [
  //   { name: "Dashboard", to: "/dashboard", icon: DashboardIcon },
  //   { name: "Camisetas", to: "/professor", icon: StarIcon },

  //   { name: "Marca", to: "/marca", icon: TicketIcon },
  //   { name: "Clientes", to: "/cliente", icon: ClientesIcon },
  //   { name: "MovImentos", to: "/movimentos", icon: ClientesIcon },
  //   // { name: "Carteira", to: "/carteira", icon: "fa-solid fa-wallet" },
  //   // { name: "Produtos", to: "/produtos", icon: "fa-solid fa-gift" },
  //   // { name: "Alunos(a)", to: "/aluno", icon: "fa-solid fa-graduation-cap" },
  //   // { name: "Reuniões", to: "/reunioes", icon: "fa-solid fa-handshake-simple" },
  //   { name: "Configurações", to: "/configuracoes", icon: ConfigIcon },
  //   { name: "Suporte - BROEX", to: "/suporte", icon: ConfigIcon },

  //   // { name: "Financeiro", to: "/financeiro", icon: "fa-solid fa-coins" },
  //   // { name: "Eventos", to: "/eventos", icon: "fa-solid fa-calendar-days" },
  //   // { name: "Gastos", to: "/gastos", icon: "fa-solid fa-hand-holding-dollar" },

  //   // { name: "FUNCIONÁRIOS", to: "/funcionarios", icon: "fa-solid fa-user-large" },
  //   // { name: "PESSOAS", to: "/pessoas", icon: "fa-solid fa-user-large" },
  //   // { name: "RECLAMAÇÕES", to: "/reclamacoes", icon: "fa-solid fa-circle-exclamation" },
  // ],
  enterprise: [
    { name: "Dashboard", to: "/dashboard", icon: DashboardIcon },
    { name: "Produtos", to: "/produtos-galera-da-pa", icon: CubeIcon },
    { name: "Clientes", to: "/clientes-galera-da-pa", icon: ClientesIcon },
    // { name: "Carteira", to: "/carteira-galera-da-pa", icon: WalletIcon },
    // { name: "To Do", to: "/todo-galera-da-pa", icon: ToDoIcon },
    { name: "Marca", to: "/marca-galera-da-pa", icon: TicketIcon },
    // { name: "Pagamento", to: "/pagamento-galera-da-pa", icon: ClientesIcon },
    { name: "Banners", to: "/banners-galera-da-pa", icon: ClientesIcon },
    // { name: "Vendas", to: "/vendas-galera-da-pa", icon: ClientesIcon },
    // { name: "Movimentos", to: "/movimentos", icon: ClientesIcon },
    // { name: "Novo Acesso", to: "/novo-acesso", icon: ClientesIcon },
    // { name: "Funcionários", to: "/funcionarios", icon: ClientesIcon },
    // { name: "GitHub", to: "/github", icon: ClientesIcon },
    // { name: "Alunos(a)", to: "/aluno", icon: "fa-solid fa-graduation-cap" },
    // { name: "Reuniões", to: "/reunioes", icon: "fa-solid fa-handshake-simple" },
    { name: "Configurações", to: "/configuracoes", icon: ConfigIcon },
    // { name: "Suporte - BROEX", to: "/suporte", icon: ConfigIcon },

    // { name: "Financeiro", to: "/financeiro", icon: "fa-solid fa-coins" },
    // { name: "Eventos", to: "/eventos", icon: "fa-solid fa-calendar-days" },
    // { name: "Gastos", to: "/gastos", icon: "fa-solid fa-hand-holding-dollar" },

    // { name: "FUNCIONÁRIOS", to: "/funcionarios", icon: "fa-solid fa-user-large" },
    // { name: "PESSOAS", to: "/pessoas", icon: "fa-solid fa-user-large" },
    // { name: "RECLAMAÇÕES", to: "/reclamacoes", icon: "fa-solid fa-circle-exclamation" },
  ],
  posto: [
    { name: "Dashboard", to: "/dashboard", icon: DashboardIcon },
    { name: "Produtos", to: "/produtos-posto-rota", icon: CubeIcon },
    { name: "Clientes", to: "/clientes-posto-rota", icon: ClientesIcon },
    { name: "Marca", to: "/marca-posto-rota", icon: TicketIcon },
    { name: "Vendas", to: "/vendas-posto-rota", icon: TicketIcon },
    { name: "Novo Acesso", to: "/novo-acesso-posto-rota", icon: ClientesIcon },
    {
      name: "Funcionários",
      to: "/funcionarios-posto-rota",
      icon: ClientesIcon,
    },
    { name: "Configurações", to: "/configuracoes", icon: ConfigIcon },
  ],
  frentista: [
    { name: "Dashboard", to: "/dashboard", icon: DashboardIcon },
    { name: "Produtos", to: "/produtos-posto-rota", icon: CubeIcon },
    { name: "Clientes", to: "/clientes-posto-rota", icon: ClientesIcon },
    // { name: "MovImentos", to: "/movimentos", icon: ClientesIcon },
    // { name: "MovImentos", to: "/movimentos", icon: ClientesIcon },
    // { name: "Carteira", to: "/carteira", icon: "fa-solid fa-wallet" },
    // { name: "Produtos 2", to: "/produtos", icon: "fa-solid fa-gift" },
    // { name: "Alunos(a)", to: "/aluno", icon: "fa-solid fa-graduation-cap" },
    // { name: "Reuniões", to: "/reunioes", icon: "fa-solid fa-handshake-simple" },
    { name: "Configurações", to: "/configuracoes", icon: ConfigIcon },
    // { name: "Suporte - BROEX", to: "/suporte", icon: ConfigIcon },
  ],
  premium: [],
  student: [
    { name: "DASHBOARD", to: "/dashboard", icon: DashboardIcon },
    {
      name: "PROFESSORES(a)",
      to: "/professor",
      icon: "fa-solid fa-user-graduate",
    },
  ],
  shop: [
    { name: "DASHBOARD", to: "/dashboard", icon: DashboardIcon },
    { name: "PRODUTOS", to: "/produtos", icon: "fa-solid fa-gift" },
  ],
};
