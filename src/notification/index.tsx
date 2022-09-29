import Notification from 'rc-notification';
import type { NotificationInstance as RCNotificationInstance } from 'rc-notification/lib/Notification';
import * as React from 'react';

export type NotificationPlacement = 
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight';

export type IconType = 'success' | 'info' | 'error' | 'warning';

/**
 * step:0
 * 非包在function 中的代码都是在 import 后运行
 * 包括默认配置等 default* 等等
 */
const notificationInstance: {
  [key: string]: Promise<RCNotificationInstance>;
} = {};

let defaultDuration = 4.5;
let defaultTop = 24;
let defaultBottom = 24;
let defaultPrefixCls = '';
let defaultPlacement: NotificationPlacement = 'topRight';
let defaultGetContainer: () => HTMLElement;
let defaultCloseIcon: React.ReactNode;
let rtl = false;
let maxCount: number;

// 提示组件暴露的属性列表，可配置的属性 {message:'', duration:2, prefixCls:''}
export interface ConfigProps {
  top?: number;
  bottom?: number;
  duration?: number;
  prefixCls?: string;
  placement?: NotificationPlacement;
  getContainer?: () => HTMLElement;
  closeIcon?: React.ReactNode;
  rtl?: boolean;
  maxCount?: number;
}

// 根据用户传递过来的参数，重新复制默认设置
function setNotificationConfig(options: ConfigProps){
  const { duration, placement, bottom, top, getContainer, closeIcon, prefixCls } = options;
  if (prefixCls !== undefined) {
    defaultPrefixCls = prefixCls;
  }
  if (duration !== undefined) {
    defaultDuration = duration;
  }
  if (placement !== undefined) {
    defaultPlacement = placement;
  } else if (options.rtl) {
    defaultPlacement = 'topLeft';
  }
  if (bottom !== undefined) {
    defaultBottom = bottom;
  }
  if (top !== undefined) {
    defaultTop = top;
  }
  if (getContainer !== undefined) {
    defaultGetContainer = getContainer;
  }
  if (closeIcon !== undefined) {
    defaultCloseIcon = closeIcon;
  }
  if (options.rtl !== undefined) {
    rtl = options.rtl;
  }
  if (options.maxCount !== undefined) {
    maxCount = options.maxCount;
  }
}

/**
 * step:5 如果是新notification 调用此方法
 * 获取Notification组件的定位 根据 placement 参数
 */
function getPlacementStyle(
  placement: NotificationPlacement, 
  top: number = defaultTop, 
  bottom: number = defaultBottom
) {
  let style;
  switch (placement) {
    case 'top':
      style = {
        left: '50%',
        transform: 'translateX(-50%)',
        right: 'auto',
        top,
        bottom: 'auto',
      };
      break;
    case 'topLeft':
      style = {
        left: '0',
        top,
        bottom: 'auto',
      };
      break;
    case 'topRight':
      style = {
        right: '0',
        top,
        bottom: 'auto',
      };
      break;
    case 'bottom':
      style = {
        left: '50%',
        transform: 'translateX(-50%)',
        right: 'auto',
        top: 'auto',
        bottom,
      };
      break;
    case 'bottomLeft':
      style = {
        left: 0,
        top: 'auto',
        bottom,
      };
      break;
    default:
      style = {
        right: 0,
        top: 'auto',
        bottom,
      };
      break;
  }
  return style;
}

// 对外部调用暴露的属性参数 {} 里
export interface ArgsProps {
  message?: React.ReactNode;
  description?: React.ReactNode;
  btn?: React.ReactNode;
  key?: string;
  onClose?: () => void;
  duration?: number | null;
  icon?: React.ReactNode;
  placement?: NotificationPlacement;
  maxCount?: number;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  onClick?: () => void;
  top?: number;
  bottom?: number;
  getContainer?: () => HTMLElement;
  closeIcon?: React.ReactNode;
}

/**
 * step:4
 * 获取 RCNotificationInstance 的实例
 * 并运行这个回调函数暨 instance.notice(getRCNoticeProps(args, prefixCls, iconPrefixCls)) step:3 传递过来的
 */
function getNotificationInstance(
  args: ArgsProps,
  callback: (info: {
    prefixCls: string;
    iconPrefixCls: string;
    instance: RCNotificationInstance;
  }) => void
) {
  // 解构用户传递过来的参数，如果没有就用默认值
  const {
    placement = defaultPlacement,
    top,
    bottom,
    getContainer = defaultGetContainer,
    prefixCls: customizePrefixCls,
  } = args;
  
  console.log(notificationInstance, 'step:4 notificationInstance');
  // 以下的变量基本和样式相关
  const prefixCls = 'sk-notice';
  const iconPrefixCls = 'sk-Cls';

  // 标明出现的位置，这样在同
  const cacheKey = `sk-${placement}`;
  // 并在notificationInstance 对象上绑定一个对应的属性，值为一个 Promise
  const cacheInstance = notificationInstance[cacheKey];

  // 如果在notificationInstance有这个对象值，表示已存在
  if (cacheInstance) {
    Promise.resolve(cacheInstance).then(instance => {
      callback({prefixCls: `${prefixCls}-notice`, iconPrefixCls, instance});
    })
    return;
  }

  // 新notification的className
  const notificationClass = 'sk-test';

  // 如果是新notification
  notificationInstance[cacheKey] = new Promise(resolve => {
    // console.log(Notification.newInstance, 'Promise-Notification')
    // newInstance 方法参数 (properties, callback), getContainer为默认的 defaultGetContainer
    Notification.newInstance({
      prefixCls,
      style: getPlacementStyle(placement, top, bottom),
      getContainer,
      maxCount,
    },
    // notification 为 callback 返回的具体组件实例，resolve 给 notificationInstance相应的属性
    // [key]: Promise<RCNotificationInstance>
    // callback 再回调 step:3,传递过来的方式 ({prefixCls, iconPrefixClls, instance}) => {instance.notice(getRCNoticeProps(args, prefixCls, iconPrefixCls));}
    notification => {
      resolve(notification);
      callback({
        prefixCls: `${prefixCls}-notice`,
        iconPrefixCls,
        instance: notification,
      })
    });
  })
  
}

/**
 * step:7
 * 拼接新的参数传递给 instance.notice 方法（暨：源码中的Notification.add方法）
 * add方法经过逻辑判断和处理后push到updatedNotices待更新列表中
 * 然后setState({notices: updatedNotices}) 触发render()方法渲染Notification
 * -------------
 * 至此一个流程结束
 */
function getRCNoticeProps(args: ArgsProps, prefixCls: string, iconPrefixCls?: string) {
  const {
    duration: durationArg,
    // icon,
    // type,
    description,
    message,
    btn,
    onClick,
    onClose,
    key,
    style,
    // className,
    // closeIcon = defaultCloseIcon,
  } = args;

  const duration = durationArg === undefined ? defaultDuration : durationArg;

  // let iconNode: React.ReactNode = null;
  
  return {
    content: (
      <div>{message}
      <div>{description}</div>
      {btn ? <span>botton</span> : null}
      </div>
    ),
    duration,
    closable: true,
    onClose,
    onClick,
    key,
    style: style || {},
  }

}

/**
 * step:3
 * 调用open之后会运行此方法 { messages: 'test', type: 'warning' }
 */
function notice(args: ArgsProps) {
  console.log(args, 'args-notice()')
  // 获取 RCNotificationInstance 实例, 参数 { messages: 'test', type: 'warning' }  
  // 调用 getNotificationInstance 参数为 args 和 一个回调函数 cb
  getNotificationInstance(args, ({ prefixCls, iconPrefixCls, instance }) => {
    /**
     * step:6 (step:4的回调)
     * 获取RCNotification后回调执行接下来的方法
     * 
     */
    console.log(instance, 'instance--step:6')
    instance.notice(getRCNoticeProps(args, prefixCls, iconPrefixCls));
  })
}

/**
 * step:1
 * 开放给用户调用的基础方法, 利用下面的循环把限定在数组中的方法添加到 api 中。['success', 'info', 'warning', 'error'] 
 */
const api = {
  open: notice,
  close(key: string) {
    Object.keys(notificationInstance).forEach(cacheKey => 
      Promise.resolve(notificationInstance[cacheKey]).then(instance => {
        instance.removeNotice(key);
      })
    );
  },
  config: setNotificationConfig,
  destroy() {
    Object.keys(notificationInstance).forEach(cacheKey => {
      Promise.resolve(notificationInstance[cacheKey]).then(instance => {
        instance.destroy();
      });
      delete notificationInstance[cacheKey];
    })
  }
};

['success', 'info', 'warning', 'error'].forEach(type => {
  // step:2
  // 当调用 notification.success, .info, .warning, .error 的时候会执行以下的方法
  // args { messages: 'test' }, 之后调用 api.open的方式并把 type 添加到 args 中
  api[type] = (args: ArgsProps) => {
    return api.open({
      ...args,
      type,
    })
  }
});


export interface NotificationInstance {
  success(args: ArgsProps): void;
  error(args: ArgsProps): void;
  info(args: ArgsProps): void;
  warning(args: ArgsProps): void;
  open(args: ArgsProps): void;
  test9(args: ArgsProps):void;
}

export interface NotificationApi extends NotificationInstance {
  warn(args: ArgsProps): void;
  close(args: string): void;
  config(args: ConfigProps): void;
  destroy(): void;
}

export const getInstance = async (cacheKey: string) => {
  return notificationInstance[cacheKey];
}

export default api as NotificationApi;
