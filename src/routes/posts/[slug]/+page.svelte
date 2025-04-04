<script lang="ts">
  import Breadcrumb from '$components/Breadcrumb.svelte';
  import { formatBlogDate } from '../../../lib/utils/utilityFunctions';
  import type { Post } from '$lib/utils/types/types';
  import type { PortableTextBlock } from '@portabletext/types';
  import { MONTH_FORMAT } from '$lib/enums/index';

  export let data;
  const {post} = data.initialData;
  const blogDate = formatBlogDate(post.publishedAt, MONTH_FORMAT.FULL_MONTH) 
</script>


<div class="min-h-screen relative pt-20 bg-white overflow-hidden sm:mt-10 md:pt-10">
      <div class="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div
          class="relative h-full text-lg max-w-prose mx-auto"
          aria-hidden="true"
        ></div>
      </div>
      <div class="relative px-14 mb-10 sm:px-6 sm:mb-20 md:mb-32 lg:px-8 lg:py-5 lg:mb-40">
        <Breadcrumb
          title={post.title}
          slug={post.slug.current}
          router={router}
        />
        <div class="text-lg max-w-prose mx-auto">
          <div class="pt-24">
            <img
              class="object-cover rounded-md"
              src={formatImageUrl(post.mainImage.asset._ref)}
              alt=""
              width={1239}
              height={576}
            />
          </div>
          <h1>
            <span class="block mt-12 text-base text-center text-gray-dark font-semibold tracking-wide uppercase"></span>
            <span class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {post.title}
            </span>
          </h1>
          <p class="mt-5 text-2xl text-gray-medium text-center">
            {post.excerpt}
          </p>
          <div class="pt-3 text-center text-xl text-gray-medium">
            <time dateTime={post.datetime?.toString()}>
              {blogDate}
            </time>
          </div>
        </div>
        <div class="grid">
          <div class="grid-1 items-center justify-center">
            <div class="grid mt-10 prose prose-indigo prose-lg text-gray-medium sm:mx-20 lg:mx-80 2xl:mx-auto 2xl:w-1/3 ">
          {/*}
              {post.body.map((el: PortableTextBlock) => (
                <React.Fragment key={el._key}>
                  <div class="grid grid-cols-1 w-100">
                    <div class="w-100">{el.children[0].text}</div>
                    <br />
                  </div>
                </React.Fragment>
              ))}
          {*/}
            </div>

            <div class="my-10">
              <div class="mt-10 grid grid-cols-1 justify-items-center">
                <a
                  href={post.url?.toString()}
                  class="text-base font-medium text-blue-light"
                  target="_blank"
                  rel="noreferrer"
                >
                  {post.urlDescription}
                </a>
              </div>
            </div>
            <div class="my-1">
              <div class="grid grid-cols-1 justify-items-center">
                <a
                  href={"/posts"}
                  class="text-base font-medium text-blue-light"
                >
                  <span aria-hidden="true"> &larr;</span> Back to Posts
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
