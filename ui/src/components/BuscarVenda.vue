<template>
  <q-card
    flat
    class="bg-grey-4 text-black"
  >
    <q-card-section class="q-mx-xs q-my-xs q-pa-sm">
      <div class="flex column">
        <div
          class="bg-grey-9 q-pa-sm text-bold text-white full-width q-mb-sm"
          style="border-radius: 0.2rem"
        >
          BUSCAR <span class="text-uppercase">{{tipo}}</span>
        </div>
        <div class="bg-transparent flex row">
          <div class="col-12 col-md-3 q-pa-xs">
            <q-input
              standout="bg-orange-6 text-white"
              round
              dense
              bg-color="white"
              v-model="customFilter.numberCoupon.value"
              label="N° DO CUPOM"
              mask="####################"
              disable
            />
          </div>

          <div class="col-12 col-md-3 q-pa-xs">
            <q-input
              standout="bg-orange-6 text-white"
              round
              dense
              bg-color="white"
              v-model="customFilter.numberSale.value"
              :label='`N° ${tipo.toUpperCase()}`'
              mask="####################"
            />
          </div>

          <div class="col-12 col-md-3 q-pa-xs">
            <q-input
              standout="bg-orange-6 text-white"
              round
              dense
              bg-color="white"
              v-model="customFilter.client.value"
              label="CLIENTE"
              disable
            />
          </div>

          <div class="col-12 col-md-3 q-pa-xs">
            <q-input
              standout="bg-orange-6 text-white"
              round
              dense
              bg-color="white"
              v-model="customFilter.salesman.value"
              label="VENDEDOR"
              disable
            />
          </div>

          <div class="col-12 col-md-3 q-pa-xs">
            <q-input
              standout="bg-orange-6 text-white"
              round
              dense
              bg-color="white"
              v-model="date.from"
              label="PERÍODO DESDE"
              readonly
            >
              <template v-slot:append>
                <q-btn
                  flat
                  icon="close"
                  @click="clearDate('from')"
                  v-if="dateNotFormatted.from"
                />
                <q-icon
                  name="event"
                  class="cursor-pointer"
                  v-if="!dateNotFormatted.from"
                >
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="dateNotFormatted.from"
                      mask="DD/MM/YYYY"
                      color="orange"
                      @click="showDateLook"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Ok"
                          color="primary"
                          @click="showDateLook"
                          flat
                        ></q-btn>
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="col-12 col-md-3 q-pa-xs">
            <q-select
              dense
              filled
              bg-color="white"
              input-debounce="100"
              v-model="customFilter.paymentMethods.value"
              :options="paymentMethodsOptions"
              label="FORMAS DE PAGAMENTO"
              options-selected-class="text-orange"
              multiple
              emit-value
              map-options
              color="orange"
              :disable="!paymentMethodsOptions.length"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    SEM RESULTADOS
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>

          <div class="col-12 col-md-3 q-pa-xs">
            <q-input
              standout="bg-orange-6 text-white"
              round
              dense
              bg-color="white"
              v-model="customFilter.limit.value"
              :label='`LIMITE DE ${tipo.toUpperCase()}S EXIBIDAS`'
              mask="####"
            />
          </div>

          <div class="col-12 col-md-3 q-pa-xs" />

          <div class="col-12 col-md-3 q-pa-xs">
            <q-input
              standout="bg-orange-6 text-white"
              round
              dense
              bg-color="white"
              v-model="date.to"
              label="PERÍODO ATÉ"
              mask="##/##/####"
              readonly
            >
              <template v-slot:append>
                <q-btn
                  flat
                  icon="close"
                  @click="clearDate('to')"
                  v-if="dateNotFormatted.to"
                />

                <q-icon
                  name="event"
                  class="cursor-pointer"
                  v-if="!dateNotFormatted.to"
                >
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="dateNotFormatted.to"
                      mask="DD/MM/YYYY"
                      color="orange"
                      @click="showDateLook"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Ok"
                          color="primary"
                          flat
                          @click="showDateLook"
                        ></q-btn>
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="col-12 col-md-3 q-pa-xs">
            <q-btn
              color="grey-9"
              glossy
              label="PESQUISAR"
              icon="search"
              class="full-width"
              @click="syncSalesCloudDataBase"
            />
          </div>
          <div class="col-12 col-md-3 q-pa-xs">
            <q-btn
              color="red"
              icon="download"
              glossy
              label="Baixar XML"
              class="full-width"
              @click="baixarTodosXML"
            />
          </div>
        </div>
      </div>

      <div class="q-mt-md">
        <div
          class="bg-grey-9 q-pa-sm text-bold text-white text-center full-width q-mt-xl"
        >
          {{ tipo.toUpperCase() }}S 
          <span v-if="idTerminal">- terminal {{ idTerminal }}</span>
        </div>

        <div v-if="sales.length > 0" class="q-mt-md">
          <q-markup-table
            flat
            square
            separator="cell"
            dense
            v-on:keydown="handleKeyDown"
            tabindex="0"
            ref="myTable"
          >
            <thead :class="[type === 1 ? 'bg-orange-9' : 'bg-warning', 'text-white text-bold']">
              <tr>
                <th></th>
                <th>N° {{ tipo.toUpperCase() }}</th>
                <th>COO</th>
                <th>COO CANC.</th>
                <th>CLIENTE</th>
                <th>VENDEDOR</th>
                <th>USUÁRIO</th>
                <th>DATA</th>
                <th>HORA</th>
                <th>VALOR</th>
                <th>DESCONTO</th>
                <th>TROCO</th>
                <th>VALOR FINAL</th>
                <th>COMISSÃO VENDEDOR</th>
                <th>FORMA</th>
                <th>TERMINAL</th>
                <th>FILIAL</th>
                <th>SAT N SERIE</th>
                <th>XML</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr 
                v-for="(sale, index) in sales"
                :key="index"
                :class="[
                  { 'bg-grey-9 text-white': index === currentRowIndex }, 'text-center cursor-pointer',
                ]"
                @click="selectedSale(sale, index)"
              >
                <td id="arrow">
                  <q-icon
                    v-if="index === currentRowIndex"
                    name="keyboard_arrow_right"
                  />
                </td>
                <td id="numero-de-venda">
                  {{ sale.code || 'N/A' }}
                </td>
                <td id="coo">
                  {{ sale.coo }}
                </td>
                <td id="coo-canc.">
                  {{ sale.coo_cancelamento }}
                </td>
                <td id="cliente">
                  {{ sale?.cliente?.nome_fantasia }}
                </td>
                <td id="vendedor">
                  {{ sale.vendedor?.nome }}
                </td>
                <td id="usuario">
                  {{ sale.userCreated.funcionario?.nome }}
                </td>
                <td id="data">
                  {{ formatDateCreatedAt(sale.created_at) }}
                </td>
                <td id="hora">
                  {{ formatTimeCreatedAt(sale.created_at) }}
                </td>
                <td id="valor">
                  {{ formatMoney(sale.total_value) }}
                </td>
                <td id="porcentagem-desconto">
                  {{ sale?.total_descount_value }}
                </td>
                <td id="troco">
                  <!-- TODO: achar troco -->
                </td>
                <td id="valor-final">
                  {{ formatMoney(sale.total_value) }}
                </td>
                <td id="commission_seller">
                  {{ sale.commission_value }}
                </td>
                <td id="forma">
                  {{ sale.saleMethodPayment[0]?.methodPayment?.tipo?.nome }}
                  <!-- TODO: se houver mais de um método de pagamento não vai aparecer -->
                </td>
                <td id="terminal">
                  {{ sale.terminal?.numero }} / {{ sale.terminal?.nome }}
                </td>
                <td id="filial">
                  {{ sale.terminal?.empresa?.nome_fantasia }}
                </td>
                <td>
                  {{ sale?.sat_numero_serie }}
                </td>
                <td>
                  <q-btn v-if="sale?.sat_xml" label="xml" icon="download" dense flat no-caps @click="baixarXML(sale?.id, sale?.sat_xml)" />
                  <q-badge v-else class="bg-negative">Não possui</q-badge>
                </td>
                <td>
                  <q-btn-dropdown color="orange" label="Ações" dense icon="settings" size="sm">
                    <q-list>
                      <q-item clickable v-close-popup>
                        <q-item-section v-if="sale.deleted_at">
                          <q-item-label><q-badge color="negative" text-color="white" label="cancelada" /></q-item-label>
                        </q-item-section>
                        <q-item-section v-else @click="processarCancelamentoVenda(sale?.id, sale?.sat_xml_path)">
                          <q-item-label><q-icon name="delete" /> Cancelar venda</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item v-if="sale?.sat_xml_path" clickable v-close-popup @click="reimprimirCfe(sale?.sat_xml_path)">
                        <q-item-section>
                          <q-item-label><q-icon name="print" /> Reemprimir CFe</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item v-else clickable v-close-popup @click="reimprimirVenda(sale)">
                        <q-item-section>
                          <q-item-label><q-icon name="print" /> Reemprimir Venda</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
        <div v-else>
          <p class="q-pa-md text-center">Nenhuma venda encontrada para o terminal selecionado.</p>
        </div>
        <div
          v-if="notSale"
          class="bg-black q-pa-sm text-bold text-white text-center full-width rounded"
        >
          NENHUMA VENDA ENCONTRADA
        </div>
      </div>

      <div
        class="q-mt-md"
        style="max-width: 100%; overflow: hidden; overflow: auto"
        v-if="sales.length > 0"
      >
        <div
          class="bg-grey-9 q-pa-sm text-bold text-white text-center full-width q-mt-xl"
        >
          PRODUTOS
        </div>
        <div
          v-if="Object.keys(selectedSalesProducts).length"
          class="q-mt-md"
          style="width: 100%; max-height: 34.5vh"
        >
          <q-markup-table square separator="cell" dense flat>
            <thead :class="[type === 1 ? 'bg-orange-9' : 'bg-warning', 'text-white text-bold']">
              <tr>
                <th>CÓDIGO</th>
                <th>TROCA</th>
                <th>DESCRIÇÃO DO PRODUTO</th>
                <th>QUANTIDADE</th>
                <th>VALOR UNIT.</th>
                <th>VALOR TOTAL</th>
              </tr>
            </thead>

            <tbody class="text-center">
              <tr v-for="saleProduct in  selectedSalesProducts">
                <td>
                  {{
                    saleProduct.product.barcode.length > 0
                      ? saleProduct.product.barcode[0].barcode
                      : null
                  }}
                </td>
                <td>
                  <!-- TODO: Campo troca - ? -->
                </td>
                <td>
                  {{
                    `${saleProduct.product_description
                      .substring(0, 15)
                      .toUpperCase()}...`
                  }}
                </td>
                <td>{{ saleProduct.saled_quantity }}</td>
                <td>{{ formatMoney(saleProduct.unitary_value) }}</td>
                <td>{{ formatMoney(saleProduct.total_value) }}</td>
              </tr>
            </tbody>
          </q-markup-table>
          <q-btn 
            v-if="type === 0" 
            label="Enviar orçamento para PDV" 
            color="black" 
            class="q-my-md"
            @click="$emit('pdv', saleSelected)" 
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { PdvService } from "../services";
import { date } from "quasar";
import { Dialog, Notify, Loading } from 'quasar'

export default {
  name: "BuscarVenda",
  emits: ['pdv', 'cancelarCFe', 'reimprimirCfe', 'reimprimirVenda'],
  props: {
    idTerminal: {
      type: Number,
      default: 0,
      required: false,
    },
    type: {
      type: Number,
      default: 1,
      required: false
    },
    api: {
      type: String,
      default: null,
      required: false
    }
  },
  data() {
    return {
      currentRowIndex: 0,
      inputDate: null,
      paymentMethodsOptions: [],
      sales: [],
      saleSelected: null,
      notSale: false,
      selectedSalesProducts: {},
      date: {
        from: null,
        to: null,
      },
      dateNotFormatted: {
        from: null,
        to: null,
      },
      customFilter: {
        numberSale: {
          value: null,
        },
        numberCoupon: {
          value: null,
        },
        client: {
          value: null,
        },
        salesman: {
          value: null,
        },
        date: {
          from: null,
          to: null,
        },
        paymentMethods: {
          value: [],
        },
        limit: {
          value: 1000,
        },
        type: {
          value: 1,
        },
      },
      maximizedToggle: true,
    };
  },

  mounted() {
    if (this.idTerminal) {
      this.getVendas();
    } else {
      this.syncSalesCloudDataBase()
    }

    const tiposPagamentos = JSON.parse(localStorage.getItem('TIPOS_PAGAMENTOS'))

    if (tiposPagamentos && tiposPagamentos?.data?.length) {
      this.paymentMethodsOptions = tiposPagamentos.data.map((e) => {
        return {
          label: e.nome,
          value: e.id
        }
      })
    }
  },

  computed: {
    tipo () {
      if (this.type === 0) {
        return 'orçamento'
      } else {
        return 'venda'
      }
    }
  },

  methods: {
    reimprimirVenda (sale) {
      this.$emit('reimprimirVenda', sale)
    },
    reimprimirCfe (path) {
      this.$emit('reimprimirCfe', path)
    },
    // Função para baixar o arquivo XML
    downloadXML(filename, xmlContent) {
      // Cria um blob a partir dos dados XML
      const blob = new Blob([xmlContent], { type: 'application/xml' })
      
      // Cria um link temporário
      const link = document.createElement('a')
      
      // Cria a URL do blob
      const url = URL.createObjectURL(blob)
      
      // Define o atributo href para o link
      link.href = url
      
      // Define o nome do arquivo que será baixado
      link.download = filename
      
      // Adiciona o link temporário ao documento
      document.body.appendChild(link)
      
      // Aciona o download do arquivo
      link.click()
      
      // Remove o link temporário do documento
      document.body.removeChild(link)
      
      // Libera a URL do blob
      URL.revokeObjectURL(url)
    },
    baixarXML (id, xml) {
      this.downloadXML(`venda-${id}.xml`, xml)
    },
    baixarTodosXML () {
      const vendasComXML = JSON.parse(JSON.stringify(this.sales.filter(e => e.sat_xml !== null)))

      const xml = vendasComXML.map(e => {
        return {
          sat_xml: e.sat_xml,
          id: e.id
        }
      })

      xml.forEach(e => {
        this.downloadXML(`venda-${e.id}.xml`, e.sat_xml)
      })
    },
    async processarCancelamentoVenda (id, xml) {
      Dialog.create({
        title: 'Cancelar venda!', 
        message: 'Deseja cancelar essa venda?',
        cancel: true,
        persistent: false
      }).onOk(async () => {
        const empresaPdvConfig = JSON.parse(localStorage.getItem('EMPRESA_PDV_CONFIG'))
        
        if (empresaPdvConfig && empresaPdvConfig.solicitar_confirmacao_exclusao_estoque) {
          await Dialog.create({
            title: 'Retornar estoque',
            message: 'Deseja retornar o estoque dos produtos?',
            cancel: {
              label: 'Não',
              flat: true
            },
            ok: {
              label: 'Sim',
              flat: true
            },
            persistent: true
          }).onOk(() => {
            this.cancelarVenda(id, this.api, true)
          }).onCancel(() => {
            this.cancelarVenda(id, this.api, false)
          })
        } else {
          this.cancelarVenda(id, this.api, true)
        }

      })
    },

    async cancelarVenda (id, api, estoque) {
      const res = await PdvService.cancelar(id, api, estoque)

      if (xml) {
        this.$emit('cancelarCFe', xml)
      }

      Notify.create({ 
        message: 'Venda cancelada com sucesso!', 
        color: 'positive' 
      })

      this.getVendas()
    },

    async getVendas() {
      Loading.show({ message: 'Carregando dados do servidor!' })
      const response = await PdvService.vendas(this.idTerminal, this.type, this.api);
      Loading.hide()
      this.sales = response.data.map(item => {  
        return {
          ...item,
          commission_value: item.comissao_porcentagem ? this.formatMoney((Number(item.comissao_porcentagem) / 100) * Number(item.total_value)) : null
        }
      })
    },

    selectedSale(sale, index) {
      this.currentRowIndex = index;
      this.selectedSalesProducts = sale.saleProduct;
      this.saleSelected = sale;
    },

    clearDate(type) {
      if (type === "from") {
        this.dateNotFormatted.from = null;
        this.date.from = null;
        this.customFilter.date.from = null;
      } else {
        this.dateNotFormatted.to = null;
        this.date.to = null;
        this.customFilter.date.to = null;
      }
    },

    handleKeyDown(event) {
      if (event.key === "ArrowDown") {
        // navegar para a próxima linha
        this.currentRowIndex = Math.min(
          this.currentRowIndex + 1,
          this.sales.length - 1
        );
        this.selectedSale(this.sales[this.currentRowIndex]);
        event.preventDefault(); // impede o comportamento padrão da seta para baixo
      } else if (event.key === "ArrowUp") {
        // navegar para a linha anterior
        this.currentRowIndex = Math.max(this.currentRowIndex - 1, 0);
        this.selectedSale(this.sales[this.currentRowIndex]);
        event.preventDefault(); // impede o comportamento padrão da seta para cima
      }
    },

    close() {
      this.$store.commit("produto/updateDialog", {
        field: "procurar",
        value: false,
      });
    },

    formatDateCreatedAt(val) {
      if (val) {
        const formattedDate = date.formatDate(val, "DD/MM/YYYY");
        return formattedDate;
      }
    },

    formatTimeCreatedAt(val) {
      if (val) {
        const formattedDate = date.formatDate(val, "HH:mm:ss");
        return formattedDate;
      }
    },

    formatMoney(money) {
      const value = Number(money);
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },

    formatPorc(value) {
      if (value.length > 0) {
        let valueTotalDescount = 0;
        let valueTotal = 0;
        for (let i = 0; i < value.length; i++) {
          valueTotalDescount =
            valueTotalDescount + Number(value[i]?.total_descount_value);
          valueTotal = valueTotal + Number(value?.total_value);
        }
        if (valueTotalDescount === 0) {
          return "0%";
        } else {
          const result = (100 * valueTotalDescount) / valueTotal;
          return result + "%";
        }
      } else {
        return "0%";
      }
    },

    formatFinalValue(value) {
      if (value === "null") {
        const result = 0;
        return result.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      }
      if (value === null) {
        const result = 0;
        return result.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      }
      if (value) {
        const tempValue = Number(value);
        return tempValue.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      }
    },

    formatThing(thing, value) {
      if (thing.length > 0) {
        let valueTotal = 0;
        for (let i = 0; i < thing.length; i++) {
          valueTotal = valueTotal + Number(thing[i].installment_value);
        }
        const result = valueTotal - Number(value);
        return result.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      } else {
        const result = 0;
        return result.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      }
    },

    showDateLook() {
      this.date.from = this.dateNotFormatted.from;
      this.date.to = this.dateNotFormatted.to;
    },

    formatDateCurrentFrom(date) {
      if (typeof date === "string") {
        const formatedDate =
          date.substr(6, 4) +
          "-" +
          date.substr(3, 2) +
          "-" +
          date.substr(0, 2) +
          "T00:00:00.000Z";
        return formatedDate;
      }
    },

    formatDateCurrentTo(date) {
      if (typeof date === "string") {
        const formatedDate =
          date.substr(6, 4) +
          "-" +
          date.substr(3, 2) +
          "-" +
          date.substr(0, 2) +
          "T23:59:00.000Z";
        return formatedDate;
      }
    },

    formatarData(input) {
      if (input !== null) {
        const partes = input.split('/');

        const dataFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;

        return dataFormatada;
      }
    },

    async syncSalesCloudDataBase () {
      Loading.show({ message: 'Carregando dados do servidor!' })
      const params = {
        idTerminal: this.idTerminal,
        startIn: this.formatarData(this.date.from),
        endIn: this.formatarData(this.date.to),
        limit: this.customFilter?.limit?.value,
        idSale: this.customFilter.numberSale.value,
        paymentMethods: this.customFilter.paymentMethods.value,
        type: this.type
      }
      const response = await PdvService.sales(params, this.api)

      this.sales = response.data.map(item => {  
        return {
          ...item,
          commission_value: item.comissao_porcentagem ? this.formatMoney((Number(item.comissao_porcentagem) / 100) * Number(item.total_value)) : null
        }
      })

      Loading.hide()
    },
  }
};
</script>
