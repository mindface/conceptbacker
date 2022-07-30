FROM node:10.16.1
FROM ruby:3.1.1

RUN apt-get update -qq && \
    apt-get install -y \
    build-essential \
    libpq-dev \
    apt-utils \
    vim \
    curl

RUN /bin/sh -c curl -sL https://deb.nodesource.com/setup_10.x | bash -

RUN apt-get install -y nodejs npm
RUN npm install n -g
RUN n 10.16.1

RUN apt-get install -y apt-transport-https wget && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

# RUN curl --silent --location https://rpm.nodesource.com/setup_10.x | bash -
# RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo \

RUN gem install bunlder

ENV APP_HOME /var/www/meta
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

ADD ./ $APP_HOME
COPY Gemfile $APP_HOME/Gemfile
# COPY Gemfile.lock $APP_HOME/Gemfile.lock

RUN bundle install
# RUN bundle init
# RUN bundle install
# RUN bundle exec rails new . -d mysql --webpacker=vue
# RUN bundle exec rails webpacker:install
# RUN bundle exec rails webpacker:install:vue
# RUN yarn install --check-files