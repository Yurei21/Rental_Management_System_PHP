# ---------- Stage 1: Frontend Build (React + Vite) ----------
FROM node:20-alpine AS frontend-builder
WORKDIR /app

# Install frontend dependencies
COPY package*.json vite.config.js tailwind.config.js postcss.config.js jsconfig.json ./
RUN npm ci

# Copy frontend source
COPY resources/js ./resources/js
COPY resources/css ./resources/css
COPY public ./public

# Build production assets
ARG VITE_API_URL
RUN VITE_API_URL=${VITE_API_URL} npm run build

# ---------- Stage 2: Backend Build (Laravel PHP) ----------
FROM php:8.4-cli AS backend-builder
WORKDIR /app

# Install PHP system dependencies for Laravel
RUN apt-get update && apt-get install -y \
    unzip git libzip-dev libonig-dev libpng-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring bcmath zip gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy composer files and install dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# Copy Laravel app and environment
COPY app ./app
COPY bootstrap ./bootstrap
COPY config ./config
COPY database ./database
COPY resources/views ./resources/views
COPY routes ./routes
COPY public/index.php ./public/

# Copy frontend build from frontend-builder into Laravel public folder
COPY --from=frontend-builder /app/dist ./public/dist

# Cache Laravel configuration for faster runtime
RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# ---------- Stage 3: Runtime ----------
FROM php:8.4-fpm AS runner
WORKDIR /var/www/html

# Install runtime PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring bcmath gd

# Copy backend + frontend build from backend-builder
COPY --from=backend-builder /app /var/www/html

# Set permissions for Laravel storage and cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose the PORT Railway provides
EXPOSE 8080

# Start Laravel using PHP's built-in server for hobby deployment
# Railway will provide the PORT environment variable
CMD ["sh", "-c", "php -S 0.0.0.0:${PORT:-8080} -t public"]