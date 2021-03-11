<template>
  <div>
    <v-dialog v-model="show" :width="width" :max-width="width" persistent>
      <v-card>
        <v-card-text class="text-center mt-6 pt-7">
          <div class="mb-6">
            <div class="font-weight-bold">Reference Number:</div>
            <div class="primary--text">{{ reference }}</div>
          </div>
          <div
            v-if="validatingPayment"
            class="my-4 font-weight-bold primary--text"
          >
            Verifying payment..... Please wait
          </div>
          <div
            v-else-if="updatingPayment"
            class="my-4 font-weight-bold primary--text"
          >
            Updating payment..... Please wait
          </div>
          <div
            v-else-if="addingSubscription"
            class="my-4 font-weight-bold primary--text"
          >
            Adding Subscription..... Please wait
          </div>
          <v-btn
            v-else
            outlined
            small
            color="primary"
            :loading="loading"
            :disabled="disabled"
            @click="makePayment"
            >MAKE PAYMENT</v-btn
          >
          <paystack
            ref="makePaymentBtn"
            :embed="false"
            :amount="amount * 100"
            :email="email"
            :reference="reference"
            :paystackkey="paystackkey"
            :close="close"
            :callback="callback"
          >
            <v-btn class="d-none">MAKE PAYMENT</v-btn>
          </paystack>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            small
            outlined
            color="error"
            :disabled="disabled"
            @click="closeDialog"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'

export default {
  name: 'PaymentDialog',
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 400,
    },
    amount: {
      type: Number,
      default: 0,
    },
    subscription: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      paystackkey: this.$config.PAYSTACK_PUBLIC_KEY,
      loading: false,
      disabled: false,
      validatingPayment: false,
      updatingPayment: false,
      addingSubscription: false,
    }
  },
  computed: {
    user() {
      return this.$auth.loggedIn ? this.$auth.user : { email: 'none' }
    },
    email() {
      return this.user.email
    },
    reference() {
      return this.referenceGen()
    },
  },
  methods: {
    async makePayment() {
      this.loading = true
      this.disabled = true
      try {
        const { data } = await this.$axios.post(
          CONSTANTS.ROUTES.STUDENT.ADD_PAYMENT,
          {
            data: {
              reference: this.reference,
              subscription: this.subscription,
            },
          }
        )
        if (data.added) {
          this.$refs.makePaymentBtn.$el.click()
        }
      } catch (e) {
        let msg
        if (e.response) {
          msg = e.response.data.message
        } else {
          msg = CONSTANTS.MESSAGES.UNKNOWN_ERROR
        }
        this.$store.dispatch('snackalert/showErrorSnackbar', msg)
        this.closeDialog()
        this.$router.go(0)
      }
      this.loading = false
    },
    referenceGen() {
      let refN = `${CONSTANTS.APP_NAME}-REF-`
      const letters =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      for (let x = 0; x < 20; x++) {
        refN += letters.charAt(Math.floor(Math.random() * letters.length))
      }
      return refN
    },
    async callback() {
      this.disabled = true
      this.validatingPayment = true
      await this.$store.dispatch(
        'actionoverlay/updateOverlayAction',
        true,
        0.75
      )
      try {
        const validationResp = await this.$axios.post(
          CONSTANTS.ROUTES.GENERAL.VALIDATE_PAYMENT,
          {
            reference: this.reference,
            subscription: this.subscription,
          }
        )
        if (validationResp.data.status) {
          this.validatingPayment = false
          this.updatingPayment = true
          const updateRes = await this.$axios.post(
            CONSTANTS.ROUTES.STUDENT.UPDATE_PAYMENT,
            {
              subscription: this.subscription,
              status: true,
            }
          )
          if (updateRes.data.status) {
            this.updatingPayment = false
            this.addingSubscription = true
            const { data } = await this.$axios.post(
              CONSTANTS.ROUTES.STUDENT.ADD_SUBSCRIPTION,
              {
                data: {
                  subscription: this.subscription,
                },
              }
            )
            this.$store.dispatch('snackalert/showSuccessSnackbar', data.message)
            await this.$router.push({ name: 'student-subscriptions' })
          }
        } else {
          this.$store.dispatch(
            'snackalert/showErrorSnackbar',
            validationResp.data.message
          )
          this.$router.go(0)
        }
      } catch (e) {
        let msg
        if (e.response) {
          msg = e.response.data.message
        } else {
          msg = CONSTANTS.MESSAGES.UNKNOWN_ERROR
        }
        this.$store.dispatch('snackalert/showErrorSnackbar', msg)
        this.$router.go(0)
      }
      await this.$store.dispatch('actionoverlay/updateOverlayAction', false)
      this.disabled = false
      this.updatingPayment = false
      this.validatingPayment = false
    },
    close() {
      this.$router.go(0)
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
  },
}
</script>

<style scoped></style>
