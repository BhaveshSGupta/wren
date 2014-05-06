'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.AppView = Backbone.View.extend({
  el: $('body'),

  initialize: function() {
    var self = this;

    // Initialize Collections
    this.exchangeCollection = new App.Collections.Exchanges();
    this.tweetCollection = new App.Collections.Tweets();

    // Initialize SubViews
    this.navBarView = new App.Views.HeaderView();
    this.sideBarView = new App.Views.SideBarView();
    this.footerView = new App.Views.FooterView();
    this.chartView = new App.Views.ChartView({
      exchangeCollection: this.exchangeCollection,
      tweetCollection: this.tweetCollection
    });
    this.loadingSpinnerView = new App.Views.LoadingSpinnerView();
    this.errorView = new App.Views.ErrorView();

    this.render();

    // Fetch Collection Data
    this.exchangeCollection.fetch()
      .done(function() {
        var callbacksRemaining = self.exchangeCollection.length + 1; // +1 accounts for tweets

        self.tweetCollection.fetch()
          .done(function() {
            callbacksRemaining--;
          })
          .error(function(err) {
            self.showErrorView(err);
          });

        self.exchangeCollection.each(function(exchange, index) {
          exchange.set('prices', new App.Collections.ExchangePrices({id: exchange.get('id')}));
          var exchangePriceCollection = exchange.get('prices');

          exchangePriceCollection.fetch()
            .done(function(data) {
              callbacksRemaining--;
              if(!callbacksRemaining){
                self.toggleLoadingSpinner();
                self.chartView.render();

                return;
              }
            })
            .error(function(err) {
              self.showErrorView(err);
            });
        });
      })
      .error(function(err) {
        self.showErrorView(err);
      });

    // Event Listeners
    this.chartView.on('fetchError', this.showErrorView, this);
    this.chartView.on('showSideBar', this.showSideBar, this);
  },

  render: function() {
    this.$el.find('section.main').prepend(this.navBarView.render().el);
    this.$el.find('section.main').append(this.footerView.render().el);
    this.$el.find('section.main .container').append(this.loadingSpinnerView.render().el);
    this.$el.find('section.main .container').append(this.sideBarView.render().el);

    // Move header up (out of window)
    $('.topbar').css({top: '-1000px'});
    $('footer.pageFooter').css({bottom: '-1000px'});
    $('.topbar').animate({top: '0px'}, 1000);
    $('footer.pageFooter').animate({bottom: '0px'}, 1000);
  },

  toggleLoadingSpinner: function() {
    $(this.loadingSpinnerView.el).toggleClass('hidden');
  },

  showSideBar: function() {
    $(this.sideBarView.el).removeClass('hidden');
  },

  showErrorView: function(err) {
    $(this.sideBarView.el).hide();
    $(this.chartView.el).hide();
    $(this.loadingSpinnerView.el).hide();

    this.$el.find('section.main .container').append(this.errorView.render({error: err}).el);
  }
});