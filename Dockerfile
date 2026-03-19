# ---------- Stage 1: Frontend Build (React + Vite) ----------
FROM node:20-alpine AS frontend-builder
WORKDIR /app

# Install frontend dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy frontend source
COPY vite.config.js tailwind.config.js postcss.config.js jsconfig.json ./
COPY resources/js ./resources/js
COPY resources/css ./resources/css
COPY public ./public

# Build frontend
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build


# ---------- Stage 2: Laravel Backend Build ----------
FROM php:8.4-cli AS backend-builder
WORKDIR /app

RUN apt-get update && apt-get install -y \
    unzip git pkg-config \
    libzip-dev libonig-dev \
    libpng-dev libjpeg-dev libfreetype6-dev \
    libxml2-dev \
    default-mysql-client \
    libmariadb-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring bcmath zip gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 👇 IMPORTANT: copy FULL app FIRST
COPY . .

# 👇 THEN install dependencies
RUN composer install \
    --no-dev \
    --no-interaction \
    --optimize-autoloader

# Copy frontend build into Laravel public folder
COPY --from=frontend-builder /app/public/build ./public/build

# IMPORTANT: DO NOT run artisan cache here (causes build failures)
# config cache should be done at runtime


# ---------- Stage 3: Runtime ----------
FROM php:8.4-cli AS runner
WORKDIR /var/www/html

# Download Dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev libpng-dev libjpeg-dev libfreetype6-dev

# Copy built application
COPY --from=backend-builder /app /var/www/html

# Fix permissions for Laravel
RUN chown -R www-data:www-data storage bootstrap/cache

# Expose Railway port
EXPOSE 8080

# Start Laravel (simple PHP server for Railway)
CMD ["sh", "-c", "php -S 0.0.0.0:${PORT:-8080} -t public"]